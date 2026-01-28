import Image from 'next/image';

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
      className={`flex flex-col items-center justify-center rounded-2xl p-3 text-center hover:scale-105 transition w-40 h-40 cursor-pointer shadow-sm hover:shadow-md`}
      style={{ backgroundColor: bgColor }}
    >
      <div>
        <Image width={60} height={60} src={icon} alt={title} />
      </div>
      <span className="mt-4 text-sm font-medium text-green-900 h-10">
        {title}
      </span>
    </button>
  );
}
