import { WorkoutMenu } from './types';

/**
 * オン期：月 - 下半身メイン①（ヒンジ＋片脚）
 * 所要目安：60〜70分
 */
export const onMondayLowerBody: WorkoutMenu = {
  id: 'on-monday-lower',
  name: 'オン期・月：下半身メイン①',
  exercises: [
    {
      id: 'barbell-hip-thrust',
      name: 'バーベル・ヒップスラスト',
      sets: 4,
      workSeconds: 60,
      restSeconds: 120,
      recommendedWeight: 60,
      targetWeight: 60,
    },
    {
      id: 'rdl',
      name: 'ルーマニアンデッドリフト（RDL）',
      sets: 3,
      workSeconds: 60,
      restSeconds: 120,
      recommendedWeight: 45,
      targetWeight: 50,
    },
    {
      id: 'dumbbell-split-squat',
      name: 'ダンベルスプリットスクワット',
      sets: 3,
      workSeconds: 45,
      restSeconds: 90,
      recommendedWeight: 11.25,
      targetWeight: 12.5,
    },
    {
      id: 'dumbbell-side-lunge',
      name: 'ダンベルサイドランジ',
      sets: 3,
      workSeconds: 40,
      restSeconds: 60,
      recommendedWeight: 9,
      targetWeight: 10,
    },
    {
      id: 'calf-raise',
      name: 'カーフレイズ',
      sets: 3,
      workSeconds: 30,
      restSeconds: 45,
      recommendedWeight: 0,
      targetWeight: 0,
    },
  ],
};

/**
 * オン期：火 - 上半身＋背中＋体幹
 * 所要目安：60分
 */
export const onTuesdayUpperBody: WorkoutMenu = {
  id: 'on-tuesday-upper',
  name: 'オン期・火：上半身＋背中＋体幹',
  exercises: [
    {
      id: 'bench-press',
      name: 'ベンチプレス',
      sets: 4,
      workSeconds: 60,
      restSeconds: 120,
      recommendedWeight: 40,
      targetWeight: 40,
    },
    {
      id: 'incline-dumbbell-press',
      name: 'インクライン・ダンベルプレス',
      sets: 3,
      workSeconds: 45,
      restSeconds: 90,
      recommendedWeight: 11.25,
      targetWeight: 12.5,
    },
    {
      id: 'lat-pulldown',
      name: 'ラットプルダウン',
      sets: 3,
      workSeconds: 45,
      restSeconds: 90,
      recommendedWeight: 40,
      targetWeight: 45,
    },
    {
      id: 'seated-row',
      name: 'シーテッドロウ',
      sets: 3,
      workSeconds: 45,
      restSeconds: 90,
      recommendedWeight: 35,
      targetWeight: 40,
    },
    {
      id: 'dumbbell-curl',
      name: 'ダンベルカール',
      sets: 3,
      workSeconds: 30,
      restSeconds: 60,
      recommendedWeight: 7,
      targetWeight: 8,
    },
    {
      id: 'pallof-press',
      name: 'パロフプレス',
      sets: 3,
      workSeconds: 30,
      restSeconds: 60,
      recommendedWeight: 10,
      targetWeight: 12,
    },
  ],
};

/**
 * オン期：木 - 下半身ライト＋体幹
 * 所要目安：45〜60分
 */
export const onThursdayLowerBodyLight: WorkoutMenu = {
  id: 'on-thursday-lower-light',
  name: 'オン期・木：下半身ライト＋体幹',
  exercises: [
    {
      id: 'front-squat',
      name: 'フロントスクワット',
      sets: 3,
      workSeconds: 45,
      restSeconds: 90,
      recommendedWeight: 37.5,
      targetWeight: 40,
    },
    {
      id: 'bulgarian-split-squat',
      name: 'ブルガリアンスクワット',
      sets: 3,
      workSeconds: 40,
      restSeconds: 75,
      recommendedWeight: 9,
      targetWeight: 10,
    },
    {
      id: 'adduction-machine',
      name: 'アダクションマシン',
      sets: 2,
      workSeconds: 30,
      restSeconds: 60,
      recommendedWeight: 25,
      targetWeight: 30,
    },
    {
      id: 'pallof-press-standing',
      name: 'パロフプレス（立位）',
      sets: 2,
      workSeconds: 20,
      restSeconds: 60,
      recommendedWeight: 9,
      targetWeight: 10,
    },
    {
      id: 'side-plank',
      name: 'サイドプランク',
      sets: 2,
      workSeconds: 25,
      restSeconds: 60,
      recommendedWeight: 0,
      targetWeight: 0,
    },
  ],
};

/**
 * オフ期：月 - 下半身①（ヒンジ・パワー）
 * 所要目安：70分
 */
export const offMondayLowerBody: WorkoutMenu = {
  id: 'off-monday-lower',
  name: 'オフ期・月：下半身①（ヒンジ・パワー）',
  exercises: [
    {
      id: 'barbell-hip-thrust',
      name: 'バーベル・ヒップスラスト',
      sets: 4,
      workSeconds: 60,
      restSeconds: 120,
      recommendedWeight: 65,
      targetWeight: 70,
    },
    {
      id: 'rdl',
      name: 'ルーマニアンデッドリフト',
      sets: 3,
      workSeconds: 60,
      restSeconds: 120,
      recommendedWeight: 50,
      targetWeight: 55,
    },
    {
      id: 'dumbbell-split-squat',
      name: 'ダンベルスプリットスクワット',
      sets: 3,
      workSeconds: 45,
      restSeconds: 90,
      recommendedWeight: 12.5,
      targetWeight: 15,
    },
    {
      id: 'dumbbell-side-lunge',
      name: 'ダンベルサイドランジ',
      sets: 3,
      workSeconds: 40,
      restSeconds: 75,
      recommendedWeight: 10.25,
      targetWeight: 12.5,
    },
    {
      id: 'calf-raise',
      name: 'カーフレイズ',
      sets: 3,
      workSeconds: 30,
      restSeconds: 45,
      recommendedWeight: 0,
      targetWeight: 0,
    },
    {
      id: 'pallof-press-standing',
      name: 'パロフプレス（立位）',
      sets: 2,
      workSeconds: 30,
      restSeconds: 60,
      recommendedWeight: 10,
      targetWeight: 12,
    },
  ],
};

/**
 * オフ期：火 - 上半身①（胸＋腕＋背中）
 * 所要目安：65〜75分
 */
export const offTuesdayUpperBody: WorkoutMenu = {
  id: 'off-tuesday-upper',
  name: 'オフ期・火：上半身①（胸＋腕＋背中）',
  exercises: [
    {
      id: 'bench-press',
      name: 'ベンチプレス',
      sets: 4,
      workSeconds: 60,
      restSeconds: 120,
      recommendedWeight: 45,
      targetWeight: 50,
    },
    {
      id: 'incline-dumbbell-press',
      name: 'インクライン・ダンベルプレス',
      sets: 3,
      workSeconds: 45,
      restSeconds: 90,
      recommendedWeight: 11.25,
      targetWeight: 12.5,
    },
    {
      id: 'dips',
      name: 'ディップス',
      sets: 3,
      workSeconds: 40,
      restSeconds: 90,
      recommendedWeight: 0,
      targetWeight: 0,
    },
    {
      id: 'lat-pulldown',
      name: 'ラットプルダウン',
      sets: 3,
      workSeconds: 45,
      restSeconds: 90,
      recommendedWeight: 40,
      targetWeight: 45,
    },
    {
      id: 'seated-row',
      name: 'シーテッドロウ',
      sets: 3,
      workSeconds: 45,
      restSeconds: 90,
      recommendedWeight: 35,
      targetWeight: 40,
    },
    {
      id: 'dumbbell-curl',
      name: 'ダンベルカール',
      sets: 3,
      workSeconds: 30,
      restSeconds: 60,
      recommendedWeight: 7,
      targetWeight: 8,
    },
    {
      id: 'pallof-press-or-hanging-knee-raise',
      name: 'パロフプレス or ハンギング・ニー・レイズ',
      sets: 3,
      workSeconds: 30,
      restSeconds: 60,
      recommendedWeight: 0,
      targetWeight: 0,
    },
  ],
};

/**
 * オフ期：木 - 下半身②（スクワット・安定）
 * 所要目安：70分
 */
export const offThursdayLowerBody: WorkoutMenu = {
  id: 'off-thursday-lower',
  name: 'オフ期・木：下半身②（スクワット・安定）',
  exercises: [
    {
      id: 'front-squat',
      name: 'フロントスクワット',
      sets: 4,
      workSeconds: 60,
      restSeconds: 120,
      recommendedWeight: 47.5,
      targetWeight: 50,
    },
    {
      id: 'bulgarian-split-squat',
      name: 'ブルガリアンスクワット',
      sets: 3,
      workSeconds: 40,
      restSeconds: 90,
      recommendedWeight: 11.25,
      targetWeight: 12.5,
    },
    {
      id: 'adduction-machine',
      name: 'アダクションマシン',
      sets: 3,
      workSeconds: 30,
      restSeconds: 60,
      recommendedWeight: 30,
      targetWeight: 35,
    },
    {
      id: 'calf-raise',
      name: 'カーフレイズ',
      sets: 3,
      workSeconds: 30,
      restSeconds: 45,
      recommendedWeight: 0,
      targetWeight: 0,
    },
    {
      id: 'pallof-press-or-side-plank',
      name: 'パロフプレス or サイドプランク',
      sets: 3,
      workSeconds: 30,
      restSeconds: 60,
      recommendedWeight: 0,
      targetWeight: 0,
    },
  ],
};

/**
 * オフ期：土 - 上半身②（ボリューム控えめ＋補強）
 * 所要目安：50〜60分
 */
export const offSaturdayUpperBody: WorkoutMenu = {
  id: 'off-saturday-upper',
  name: 'オフ期・土：上半身②（ボリューム控えめ＋補強）',
  exercises: [
    {
      id: 'dumbbell-bench-press',
      name: 'ダンベルベンチプレス',
      sets: 3,
      workSeconds: 45,
      restSeconds: 90,
      recommendedWeight: 11.25,
      targetWeight: 12.5,
    },
    {
      id: 'one-hand-dumbbell-row',
      name: 'ワンハンドダンベルロウ',
      sets: 3,
      workSeconds: 45,
      restSeconds: 90,
      recommendedWeight: 15,
      targetWeight: 17.5,
    },
    {
      id: 'shoulder-press-standing',
      name: 'ショルダープレス（立位）',
      sets: 3,
      workSeconds: 40,
      restSeconds: 75,
      recommendedWeight: 7,
      targetWeight: 8,
    },
    {
      id: 'rear-delt-machine-or-rear-raise',
      name: 'リアデルトマシン or リアレイズ',
      sets: 3,
      workSeconds: 30,
      restSeconds: 60,
      recommendedWeight: 0,
      targetWeight: 0,
    },
    {
      id: 'hanging-knee-raise',
      name: 'ハンギング・ニー・レイズ',
      sets: 3,
      workSeconds: 30,
      restSeconds: 90,
      recommendedWeight: 0,
      targetWeight: 0,
    },
  ],
};

/**
 * 種目間レスト時間（秒）
 */
export const REST_BETWEEN_EXERCISES_SECONDS = 180;

/**
 * 全メニューのリスト（選択用）
 */
export const allMenus: WorkoutMenu[] = [
  onMondayLowerBody,
  onTuesdayUpperBody,
  onThursdayLowerBodyLight,
  offMondayLowerBody,
  offTuesdayUpperBody,
  offThursdayLowerBody,
  offSaturdayUpperBody,
];
