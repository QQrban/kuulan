import Image, { StaticImageData } from 'next/image';

type AgeCardProps = {
  ageLabel: string;
  title: string;
  image: StaticImageData;
  borderColor?: string;
  accentColor?: string;
  bgColor?: string;
};

export default function AgeCard({
  ageLabel,
  title,
  image,
  borderColor = 'var(--brand-1)',
  accentColor = 'var(--brand-2)',
  bgColor = 'rgba(255, 247, 223, 0.8)',
}: AgeCardProps) {
  return (
    <div
      className="relative w-80 h-102 rounded-[36px] border-[3px] px-8 pb-8 pt-24 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
      style={{ borderColor, backgroundColor: bgColor }}
    >
      <div
        className="absolute left-1/2 top-4.5 h-25 w-25 -translate-x-1/2 rounded-full flex items-center justify-center"
        style={{ backgroundColor: accentColor }}
      >
        <div className="text-white text-2xl font-extrabold leading-none">
          {ageLabel}
        </div>
      </div>

      <div className="mx-auto mt-10 w-55">
        <div className="relative h-40 w-full overflow-hidden rounded-[28px] bg-white">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="250px"
            priority
          />
        </div>

        <div className="pt-6 text-center text-2xl font-extrabold text-(--text-main)">
          {title}
        </div>
      </div>
    </div>
  );
}
