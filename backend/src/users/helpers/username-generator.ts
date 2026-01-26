import { User } from '../users.model';

type Locale = 'en' | 'ru' | 'ee';

export const ADJECTIVES: Record<Locale, string[]> = {
  en: [
    'Happy',
    'Sunny',
    'Brave',
    'Magic',
    'Cool',
    'Funny',
    'Smart',
    'Bright',
    'Kind',
    'Fast',
    'Tiny',
    'Giant',
    'Sweet',
    'Wild',
    'Soft',
  ],
  ru: [
    'Весёлый',
    'Солнечный',
    'Смелый',
    'Волшебный',
    'Крутой',
    'Умный',
    'Добрый',
    'Быстрый',
    'Яркий',
    'Тихий',
    'Маленький',
    'Большой',
    'Сладкий',
    'Дикий',
    'Мягкий',
  ],
  ee: [
    'Rõõmus',
    'Päikeseline',
    'Julge',
    'Võluv',
    'Lahe',
    'Naljakas',
    'Tark',
    'Särav',
    'Lahke',
    'Kiire',
    'Väike',
    'Suur',
    'Magus',
    'Metsik',
    'Pehme',
  ],
};

export const NOUNS: Record<Locale, string[]> = {
  en: [
    'Cat',
    'Dog',
    'Tiger',
    'Lion',
    'Panda',
    'Fox',
    'Dragon',
    'Bear',
    'Bunny',
    'Unicorn',
    'Robot',
    'Pirate',
    'Ninja',
    'Wizard',
    'Rocket',
  ],
  ru: [
    'Кот',
    'Собакен',
    'Тигр',
    'Лев',
    'Панда',
    'Лиса',
    'Дракон',
    'Медведь',
    'Кролик',
    'Единорог',
    'Робот',
    'Пират',
    'Ниндзя',
    'Волшебник',
    'Ракета',
  ],
  ee: [
    'Kass',
    'Koer',
    'Tiiger',
    'Lõvi',
    'Panda',
    'Rebane',
    'Draakon',
    'Karu',
    'Jänes',
    'Ükssarvik',
    'Robot',
    'Piraat',
    'Ninja',
    'Võlur',
    'Rakett',
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

    username = `${adj}${noun}${num}`;
  } while (await repo.findOne({ where: { username } }));

  return username;
}
