export default function GameCard({
  title,
  icon,
  bgColor,
}: {
  title: string;
  icon: string;
  bgColor: string;
}) {
  return (
    <button
      className={`flex flex-col items-center justify-center rounded-2xl p-3 text-center hover:scale-105 transition`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="text-3xl">{icon}</div>
      <span className="mt-2 text-sm font-medium text-green-900">{title}</span>
    </button>
  );
}
