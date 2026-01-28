export async function fetchGames(age: number, categoryId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/games?age=${age}&categoryId=${categoryId}`,
    { cache: 'no-store' }
  );

  if (!res.ok) throw new Error('Failed to load games');

  return res.json();
}
