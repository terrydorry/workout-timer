/**
 * ワークアウトのフェーズ（状態）
 */
export type Phase = 
  | 'idle'                    // 待機中（メニュー選択前）
  | 'ready'                   // メニュー選択済み（スタート待ち）
  | 'working'                 // セット実行中
  | 'restBetweenSets'         // セット間レスト中
  | 'restBetweenExercises'    // 種目間レスト中
  | 'paused'                  // 一時停止中
  | 'finished';               // 完了

/**
 * 種目（Exercise）の型定義
 */
export interface Exercise {
  id: string;
  name: string;
  sets: number;              // セット数
  workSeconds: number;       // セット時間（秒）
  restSeconds: number;       // セット間レスト時間（秒）
  recommendedWeight?: number; // 推奨重量（kg）
  targetWeight?: number;      // 目標重量（kg）
}

/**
 * ワークアウトメニューの型定義
 */
export interface WorkoutMenu {
  id: string;
  name: string;
  exercises: Exercise[];
}

/**
 * 現在のワークアウト状態
 */
export interface WorkoutState {
  phase: Phase;
  currentExerciseIndex: number;  // 現在の種目のインデックス
  currentSet: number;             // 現在のセット番号（1から開始）
  remainingSeconds: number;       // 残り時間（秒）
  selectedMenu: WorkoutMenu | null;
}

