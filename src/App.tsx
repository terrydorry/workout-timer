import { useEffect } from 'react';
import { useWorkoutController } from './hooks/useWorkoutController';
import {
  onMondayLowerBody,
  onTuesdayUpperBody,
  onThursdayLowerBodyLight,
  offMondayLowerBody,
  offTuesdayUpperBody,
  offThursdayLowerBody,
  offSaturdayUpperBody,
} from './workoutData';
import { requestNotificationPermission } from './utils/notifications';
import { initAudioContext } from './utils/sound';
import './App.css';

/**
 * 時間をmm:ss形式にフォーマット
 */
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * フェーズ名を日本語に変換
 */
const getPhaseLabel = (phase: string): string => {
  const labels: Record<string, string> = {
    idle: '待機中',
    ready: '準備中',
    working: 'セット実行中',
    restBetweenSets: 'セット間レスト',
    restBetweenExercises: '種目間レスト',
    paused: '一時停止中',
    finished: '完了',
  };
  return labels[phase] || phase;
};

function App() {
  const { state, selectMenu, startWorkout, togglePause, skip, reset } = useWorkoutController();

  // 通知と音声の初期化
  useEffect(() => {
    // 通知の許可をリクエスト
    requestNotificationPermission();

    // 音声コンテキストの初期化（ユーザー操作後に実行）
    const handleUserInteraction = () => {
      initAudioContext();
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  // バックグラウンドでもタイマーが動作するように（Visibility API）
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // バックグラウンドに移行したときの処理（必要に応じて）
        console.log('アプリがバックグラウンドに移行しました');
      } else {
        // フォアグラウンドに戻ったときの処理
        console.log('アプリがフォアグラウンドに戻りました');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // 確認画面（メニュー選択済み、スタート待ち）
  if (state.phase === 'ready' && state.selectedMenu) {
    const totalSets = state.selectedMenu.exercises.reduce(
      (sum, ex) => sum + ex.sets,
      0
    );
    return (
      <div className="app">
        <div className="container">
          <div className="ready-screen">
            <h1 className="ready-title">メニュー確認</h1>
            <div className="ready-menu-info">
              <h2 className="ready-menu-name">{state.selectedMenu.name}</h2>
              <div className="ready-stats">
                <div className="ready-stat-item">
                  <span className="ready-stat-label">種目数:</span>
                  <span className="ready-stat-value">
                    {state.selectedMenu.exercises.length}種目
                  </span>
                </div>
                <div className="ready-stat-item">
                  <span className="ready-stat-label">総セット数:</span>
                  <span className="ready-stat-value">{totalSets}セット</span>
                </div>
              </div>
              <div className="ready-exercises">
                <h3 className="ready-exercises-title">種目一覧</h3>
                <ul className="ready-exercises-list">
                  {state.selectedMenu.exercises.map((exercise, index) => (
                    <li key={exercise.id} className="ready-exercise-item">
                      <span className="ready-exercise-number">{index + 1}.</span>
                      <span className="ready-exercise-name">{exercise.name}</span>
                      <span className="ready-exercise-sets">{exercise.sets}セット</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="ready-controls">
              <button className="control-button start-button" onClick={startWorkout}>
                スタート
              </button>
              <button className="control-button cancel-button" onClick={reset}>
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ホーム画面（メニュー選択）
  if (state.phase === 'idle') {
    return (
      <div className="app">
        <div className="container">
          <h1 className="title">筋トレタイマー</h1>
          <p className="subtitle">メニューを選択してください</p>
          
          {/* オン期メニュー */}
          <div className="menu-section">
            <h2 className="menu-section-title">オン期（サッカー練習あり）</h2>
            <div className="menu-selection">
              <button
                className="menu-button"
                onClick={() => selectMenu(onMondayLowerBody)}
              >
                <div className="menu-button-title">月：下半身メイン①</div>
                <div className="menu-button-subtitle">
                  {onMondayLowerBody.exercises.length}種目 | 60〜70分
                </div>
              </button>
              <button
                className="menu-button"
                onClick={() => selectMenu(onTuesdayUpperBody)}
              >
                <div className="menu-button-title">火：上半身＋背中＋体幹</div>
                <div className="menu-button-subtitle">
                  {onTuesdayUpperBody.exercises.length}種目 | 60分
                </div>
              </button>
              <button
                className="menu-button"
                onClick={() => selectMenu(onThursdayLowerBodyLight)}
              >
                <div className="menu-button-title">木：下半身ライト＋体幹</div>
                <div className="menu-button-subtitle">
                  {onThursdayLowerBodyLight.exercises.length}種目 | 45〜60分
                </div>
              </button>
            </div>
          </div>

          {/* オフ期メニュー */}
          <div className="menu-section">
            <h2 className="menu-section-title">オフ期（サッカー練習なし）</h2>
            <div className="menu-selection">
              <button
                className="menu-button"
                onClick={() => selectMenu(offMondayLowerBody)}
              >
                <div className="menu-button-title">月：下半身①（ヒンジ・パワー）</div>
                <div className="menu-button-subtitle">
                  {offMondayLowerBody.exercises.length}種目 | 70分
                </div>
              </button>
              <button
                className="menu-button"
                onClick={() => selectMenu(offTuesdayUpperBody)}
              >
                <div className="menu-button-title">火：上半身①（胸＋腕＋背中）</div>
                <div className="menu-button-subtitle">
                  {offTuesdayUpperBody.exercises.length}種目 | 65〜75分
                </div>
              </button>
              <button
                className="menu-button"
                onClick={() => selectMenu(offThursdayLowerBody)}
              >
                <div className="menu-button-title">木：下半身②（スクワット・安定）</div>
                <div className="menu-button-subtitle">
                  {offThursdayLowerBody.exercises.length}種目 | 70分
                </div>
              </button>
              <button
                className="menu-button"
                onClick={() => selectMenu(offSaturdayUpperBody)}
              >
                <div className="menu-button-title">土：上半身②（ボリューム控えめ）</div>
                <div className="menu-button-subtitle">
                  {offSaturdayUpperBody.exercises.length}種目 | 50〜60分
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 完了画面
  if (state.phase === 'finished') {
    return (
      <div className="app">
        <div className="container">
          <div className="finished-screen">
            <h1 className="finished-title">お疲れさまでした！</h1>
            <p className="finished-message">
              全種目のトレーニングが完了しました。
            </p>
            <button className="reset-button" onClick={reset}>
              ホームに戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ワークアウト実行中
  const currentExercise = state.selectedMenu!.exercises[state.currentExerciseIndex];
  const totalExercises = state.selectedMenu!.exercises.length;
  const exerciseProgress = state.currentExerciseIndex + 1;

  return (
    <div className="app">
      <div className="container">
        {/* ヘッダー情報 */}
        <div className="workout-header">
          <div className="phase-label">{getPhaseLabel(state.phase)}</div>
          <div className="progress-info">
            種目 {exerciseProgress} / {totalExercises}
          </div>
        </div>

        {/* メイン情報 */}
        <div className="workout-main">
          <h2 className="exercise-name">{currentExercise.name}</h2>
          
          <div className="set-info">
            セット {state.currentSet} / {currentExercise.sets}
          </div>

          <div className="timer-display">
            {formatTime(state.remainingSeconds)}
          </div>

          {(currentExercise.recommendedWeight !== undefined && 
            currentExercise.recommendedWeight > 0) && (
            <div className="weight-info">
              <div className="weight-item">
                <span className="weight-label">推奨重量:</span>
                <span className="weight-value">
                  {currentExercise.recommendedWeight}kg
                </span>
              </div>
              {currentExercise.targetWeight !== undefined && 
               currentExercise.targetWeight > 0 && (
                <div className="weight-item">
                  <span className="weight-label">目標重量:</span>
                  <span className="weight-value">
                    {currentExercise.targetWeight}kg
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 操作ボタン */}
        <div className="workout-controls">
          {state.phase === 'paused' ? (
            <>
              <button className="control-button resume-button" onClick={togglePause}>
                再開
              </button>
              <button className="control-button skip-button" onClick={skip}>
                スキップ
              </button>
            </>
          ) : (
            <>
              {(state.phase === 'working' || 
                state.phase === 'restBetweenSets' || 
                state.phase === 'restBetweenExercises') && (
                <button className="control-button pause-button" onClick={togglePause}>
                  一時停止
                </button>
              )}
              {(state.phase === 'working' || 
                state.phase === 'restBetweenSets' || 
                state.phase === 'restBetweenExercises') && (
                <button className="control-button skip-button" onClick={skip}>
                  スキップ
                </button>
              )}
            </>
          )}

          <button className="control-button reset-button" onClick={reset}>
            リセット
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

