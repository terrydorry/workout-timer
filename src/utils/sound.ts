/**
 * 音声通知ユーティリティ
 * Web Audio APIを使用してBluetoothイヤフォンでも動作する音を生成
 */

let audioContext: AudioContext | null = null;

/**
 * AudioContextを初期化（ユーザー操作後に呼び出す必要がある）
 */
export const initAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

/**
 * ビープ音を再生
 * @param frequency 周波数（Hz）
 * @param duration 持続時間（秒）
 * @param volume 音量（0-1）
 */
export const playBeep = (
  frequency: number = 800,
  duration: number = 0.2,
  volume: number = 0.5
): void => {
  try {
    const ctx = initAudioContext();
    
    // AudioContextがsuspended状態の場合は再開
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (error) {
    console.error('音声再生エラー:', error);
  }
};

/**
 * セット開始音
 */
export const playStartSound = (): void => {
  playBeep(800, 0.3, 0.6);
  setTimeout(() => playBeep(1000, 0.2, 0.5), 150);
};

/**
 * セット終了音
 */
export const playEndSound = (): void => {
  playBeep(600, 0.2, 0.6);
  setTimeout(() => playBeep(500, 0.2, 0.6), 100);
  setTimeout(() => playBeep(400, 0.3, 0.6), 200);
};

/**
 * カウントダウン音（残り時間の通知）
 */
export const playCountdownSound = (): void => {
  playBeep(1000, 0.1, 0.4);
};

/**
 * 完了音
 */
export const playCompleteSound = (): void => {
  // 上昇音階
  const notes = [523.25, 587.33, 659.25, 698.46, 783.99]; // C, D, E, F, G
  notes.forEach((freq, index) => {
    setTimeout(() => playBeep(freq, 0.15, 0.5), index * 100);
  });
};

