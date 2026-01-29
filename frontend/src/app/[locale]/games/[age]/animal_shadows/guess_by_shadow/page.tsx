import GuessByShadowEngine from '@/components/engines/GuessByShadowEngine';

export default function Page() {
  const items = [
    {
      id: 'cow',
      shadow: '/assets/guess_by_shadow/cow_shadow.png',
      correct: '/assets/animals/cow.png',
      correctWord: 'Корова',
      choices: [
        '/assets/animals/cow.png',
        '/assets/animals/dog.png',
        '/assets/animals/cat.png',
      ],
    },
  ];

  return <GuessByShadowEngine items={items} />;
}
