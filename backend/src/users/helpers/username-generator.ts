import { User } from '../users.model';

type Locale = 'en' | 'ru' | 'ee';

export const ADJECTIVES: Record<Locale, string[]> = {
  en: [
    'happy',
    'sunny',
    'brave',
    'magic',
    'cool',
    'funny',
    'smart',
    'bright',
    'kind',
    'fast',
    'tiny',
    'giant',
    'sweet',
    'wild',
    'soft',
  ],
  ru: [
    'весёлый',
    'солнечный',
    'смелый',
    'волшебный',
    'крутой',
    'умный',
    'добрый',
    'быстрый',
    'яркий',
    'тихий',
    'маленький',
    'большой',
    'сладкий',
    'дикий',
    'мягкий',
  ],
  ee: [
    'rõõmus',
    'päikeseline',
    'julge',
    'võluv',
    'lahe',
    'naljakas',
    'tark',
    'särav',
    'lahke',
    'kiire',
    'väike',
    'suur',
    'magus',
    'metsik',
    'pehme',
  ],
};

export const NOUNS: Record<Locale, string[]> = {
  en: [
    'cat',
    'dog',
    'tiger',
    'lion',
    'panda',
    'fox',
    'dragon',
    'bear',
    'bunny',
    'unicorn',
    'robot',
    'pirate',
    'ninja',
    'wizard',
    'rocket',
  ],
  ru: [
    'кот',
    'собакен',
    'тигр',
    'лев',
    'панда',
    'лиса',
    'дракон',
    'медведь',
    'кролик',
    'единорог',
    'робот',
    'пират',
    'ниндзя',
    'волшебник',
    'ракета',
  ],
  ee: [
    'kass',
    'koer',
    'tiiger',
    'lõvi',
    'panda',
    'rebane',
    'draakon',
    'karu',
    'jänes',
    'ükssarvik',
    'robot',
    'piraat',
    'ninja',
    'võlur',
    'rakett',
  ],
};

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function normalizeLocale(locale?: string): 'en' | 'ru' | 'ee' {
  if (!locale) return 'en';
  if (locale.startsWith('ru')) return 'ru';
  if (locale.startsWith('ee')) return 'ee';
  return 'en';
}

export async function generateUsername(
  repo: typeof User,
  locale?: string,
): Promise<string> {
  const lang = normalizeLocale(locale);

  const adjectives = ADJECTIVES[lang];
  const nouns = NOUNS[lang];

  let username: string;

  do {
    const adj = randomFrom(adjectives);
    const noun = randomFrom(nouns);
    const num = Math.floor(Math.random() * 1000);

    username = `${adj}_${noun}_${num}`;
  } while (await repo.findOne({ where: { username } }));

  return username;
}
