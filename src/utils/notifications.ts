/**
 * 通知機能ユーティリティ
 */

/**
 * 通知の許可をリクエスト
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('このブラウザは通知をサポートしていません');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

/**
 * 通知を表示
 */
export const showNotification = (
  title: string,
  options?: NotificationOptions
): void => {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  try {
    const notification = new Notification(title, {
      badge: '/icon-192.png',
      icon: '/icon-192.png',
      requireInteraction: false,
      ...options,
    });

    // 5秒後に自動的に閉じる
    setTimeout(() => {
      notification.close();
    }, 5000);
  } catch (error) {
    console.error('通知エラー:', error);
  }
};

/**
 * ワークアウト通知
 */
export const notifyWorkoutStart = (exerciseName: string, setNumber: number): void => {
  showNotification('セット開始', {
    body: `${exerciseName} - セット ${setNumber}`,
    tag: 'workout-start',
  });
};

export const notifyWorkoutEnd = (): void => {
  showNotification('セット終了', {
    body: 'レスト時間です',
    tag: 'workout-end',
  });
};

export const notifyRestEnd = (exerciseName: string, nextSet: number): void => {
  showNotification('レスト終了', {
    body: `${exerciseName} - セット ${nextSet} を開始`,
    tag: 'rest-end',
  });
};

export const notifyExerciseComplete = (nextExerciseName?: string): void => {
  if (nextExerciseName) {
    showNotification('種目間レスト', {
      body: `次: ${nextExerciseName}`,
      tag: 'exercise-rest',
    });
  } else {
    showNotification('ワークアウト完了！', {
      body: 'お疲れさまでした！',
      tag: 'workout-complete',
    });
  }
};

