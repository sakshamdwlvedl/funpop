export const ANIMAL_CHARACTERS = [
  'SillyMonkey', 'GrumpyCat', 'HappyDog', 'CoolRabbit', 'LazyPanda',
  'FunnyElephant', 'SmartFox', 'BigLion', 'FastCheetah', 'KindGiraffe',
  'BraveTiger', 'SweetKoala', 'NaughtyRaccoon', 'WiseOwl', 'TinyHamster',
  'FunnyPenguin', 'CoolDolphin', 'SleepySloth', 'ActiveOtter', 'ShyDeer',
  'GrumpyBear', 'HappyHippo', 'SmartZebra', 'FunnyKangaroo', 'CoolShark',
  'LazyTurtle', 'FunnyParrot', 'SmartOctopus', 'BigWhale', 'FastHorse',
  'KindCamel', 'BraveWolf', 'SweetSquirrel', 'NaughtyGoat', 'WiseRaven',
  'TinyMouse', 'FunnyLlama', 'CoolFlamingo', 'SleepyLemur', 'ActiveBeaver',
  'ShyHedgehog', 'GrumpyRhino', 'HappyFrog', 'SmartButterfly', 'FunnyPig',
  'CoolEagle', 'LazyWallaby', 'FunnyMarmot', 'SmartPlatypus', 'BigGorilla'
];

export const ANIMAL_AVATAR_URL = (seed: string) => `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${encodeURIComponent(seed)}`;

export const FALLBACK_AVATARS = ANIMAL_CHARACTERS.map(name => ({
  name,
  url: ANIMAL_AVATAR_URL(name)
}));
