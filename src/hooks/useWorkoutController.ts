import { useState, useEffect, useRef, useCallback } from 'react';
import { Phase, WorkoutState, WorkoutMenu } from '../types';
import { REST_BETWEEN_EXERCISES_SECONDS } from '../workoutData';
import {
  playStartSound,
  playEndSound,
  playCountdownSound,
  playCompleteSound,
  initAudioContext,
} from '../utils/sound';
import {
  notifyWorkoutStart,
  notifyWorkoutEnd,
  notifyRestEnd,
  notifyExerciseComplete,
} from '../utils/notifications';

/**
 * ワークアウト制御用のカスタムHook
 */
export const useWorkoutController = () => {
  // ワークアウト状態
  const [state, setState] = useState<WorkoutState>({
    phase: 'idle',
    currentExerciseIndex: 0,
    currentSet: 1,
    remainingSeconds: 0,
    selectedMenu: null,
  });

  // タイマーの参照
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // 最新のstateを保持するためのref
  const stateRef = useRef<WorkoutState>(state);

  // stateRefを常に最新に保つ
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  /**
   * タイマーをクリア
   */
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * タイマーを開始
   */
  const startTimer = useCallback((
    seconds: number,
    onComplete: () => void,
    phase: Phase = 'working'
  ) => {
    clearTimer();
    setState((prev) => ({ ...prev, remainingSeconds: seconds }));

    intervalRef.current = setInterval(() => {
      setState((prev) => {
        const newSeconds = prev.remainingSeconds - 1;
        
        // カウントダウン音（残り10秒、5秒、3秒、2秒、1秒）
        if (newSeconds === 10 || newSeconds === 5 || (newSeconds <= 3 && newSeconds > 0)) {
          playCountdownSound();
        }
        
        if (newSeconds <= 0) {
          clearTimer();
          // タイマー完了後のコールバックを非同期で実行
          setTimeout(() => onComplete(), 0);
          return { ...prev, remainingSeconds: 0 };
        }
        return { ...prev, remainingSeconds: newSeconds };
      });
    }, 1000);
  }, [clearTimer]);

  /**
   * 次のセットに進む
   */
  const moveToNextSet = useCallback(() => {
    const currentState = stateRef.current;
    if (!currentState.selectedMenu) return;

    const currentExercise = currentState.selectedMenu.exercises[currentState.currentExerciseIndex];
    const nextSet = currentState.currentSet + 1;

    // 現在の種目の全セットが終了した場合
    if (nextSet > currentExercise.sets) {
      // 次の種目があるか確認
      if (currentState.currentExerciseIndex < currentState.selectedMenu.exercises.length - 1) {
        // 種目間レストへ
        const nextExerciseIndex = currentState.currentExerciseIndex + 1;

        setState({
          ...currentState,
          phase: 'restBetweenExercises',
          currentExerciseIndex: nextExerciseIndex,
          currentSet: 1,
          remainingSeconds: REST_BETWEEN_EXERCISES_SECONDS,
        });

        // 種目間レスト開始
        const nextExercise = currentState.selectedMenu.exercises[nextExerciseIndex];
        notifyExerciseComplete(nextExercise.name);
        playEndSound();

        startTimer(REST_BETWEEN_EXERCISES_SECONDS, () => {
          // 種目間レスト終了後、次の種目のセット開始
          const latestState = stateRef.current;
          if (!latestState.selectedMenu) return;
          
          const exercise = latestState.selectedMenu.exercises[latestState.currentExerciseIndex];
          playStartSound();
          notifyWorkoutStart(exercise.name, 1);
          
          setState({
            ...latestState,
            phase: 'working',
            remainingSeconds: exercise.workSeconds,
          });
          startTimer(exercise.workSeconds, moveToNextSet, 'working');
        }, 'restBetweenExercises');
      } else {
        // 全種目完了
        playCompleteSound();
        notifyExerciseComplete();
        setState({
          ...currentState,
          phase: 'finished',
          remainingSeconds: 0,
        });
      }
    } else {
      // セット間レストへ
      setState({
        ...currentState,
        phase: 'restBetweenSets',
        currentSet: nextSet,
        remainingSeconds: currentExercise.restSeconds,
      });

      // セット間レスト開始
      playEndSound();
      notifyWorkoutEnd();
      
      startTimer(currentExercise.restSeconds, () => {
        // セット間レスト終了後、次のセット開始
        const latestState = stateRef.current;
        if (!latestState.selectedMenu) return;
        
        const exercise = latestState.selectedMenu.exercises[latestState.currentExerciseIndex];
        playStartSound();
        notifyRestEnd(exercise.name, nextSet);
        
        setState({
          ...latestState,
          phase: 'working',
          remainingSeconds: exercise.workSeconds,
        });
        startTimer(exercise.workSeconds, moveToNextSet, 'working');
      }, 'restBetweenSets');
    }
  }, [startTimer]);

  /**
   * メニューを選択（確認画面へ）
   */
  const selectMenu = useCallback((menu: WorkoutMenu) => {
    if (menu.exercises.length === 0) return;

    setState({
      phase: 'ready',
      currentExerciseIndex: 0,
      currentSet: 1,
      remainingSeconds: 0,
      selectedMenu: menu,
    });
  }, []);

  /**
   * ワークアウト開始（タイマー開始）
   */
  const startWorkout = useCallback(() => {
    const currentState = stateRef.current;
    if (!currentState.selectedMenu || currentState.phase !== 'ready') return;

    // 音声コンテキストを初期化（ユーザー操作後なので可能）
    initAudioContext();

    const firstExercise = currentState.selectedMenu.exercises[0];
    const newState: WorkoutState = {
      phase: 'working',
      currentExerciseIndex: 0,
      currentSet: 1,
      remainingSeconds: firstExercise.workSeconds,
      selectedMenu: currentState.selectedMenu,
    };
    
    setState(newState);
    playStartSound();
    notifyWorkoutStart(firstExercise.name, 1);
    startTimer(firstExercise.workSeconds, moveToNextSet, 'working');
  }, [startTimer, moveToNextSet]);

  /**
   * 一時停止 / 再開
   */
  const togglePause = useCallback(() => {
    const currentState = stateRef.current;
    
    if (currentState.phase === 'paused') {
      // 再開
      if (!currentState.selectedMenu) return;
      
      const currentExercise = currentState.selectedMenu.exercises[currentState.currentExerciseIndex];
      const seconds = currentState.remainingSeconds;
      
      // 次のフェーズを決定
      let nextPhase: Phase;
      if (currentState.currentSet < currentExercise.sets) {
        // まだセットが残っている場合
        nextPhase = currentState.currentSet === 1 ? 'working' : 'restBetweenSets';
      } else if (currentState.currentExerciseIndex < currentState.selectedMenu.exercises.length - 1) {
        // 次の種目がある場合
        nextPhase = 'restBetweenExercises';
      } else {
        // 最後のセットの場合
        nextPhase = 'working';
      }
      
      setState({
        ...currentState,
        phase: nextPhase,
      });
      startTimer(seconds, moveToNextSet, nextPhase);
    } else if (
      currentState.phase === 'working' || 
      currentState.phase === 'restBetweenSets' || 
      currentState.phase === 'restBetweenExercises'
    ) {
      // 一時停止
      clearTimer();
      setState({
        ...currentState,
        phase: 'paused',
      });
    }
  }, [clearTimer, startTimer, moveToNextSet]);

  /**
   * スキップ（次のセット or 次の種目へ）
   */
  const skip = useCallback(() => {
    clearTimer();
    moveToNextSet();
  }, [clearTimer, moveToNextSet]);

  /**
   * リセット
   */
  const reset = useCallback(() => {
    clearTimer();
    setState({
      phase: 'idle',
      currentExerciseIndex: 0,
      currentSet: 1,
      remainingSeconds: 0,
      selectedMenu: null,
    });
  }, [clearTimer]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return {
    state,
    selectMenu,
    startWorkout,
    togglePause,
    skip,
    reset,
  };
};
