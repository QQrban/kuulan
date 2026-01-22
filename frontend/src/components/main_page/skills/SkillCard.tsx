import React from 'react';

type SkillCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;

  accentColor: string;

  className?: string;
  iconBgOpacity?: number;
};

export function SkillCard({
  title,
  description,
  icon,
  accentColor,
  className = '',
  iconBgOpacity = 0.14,
}: SkillCardProps) {
  return (
    <div
      className={[
        'rounded-4xl border-4 bg-white px-5 py-6 w-full min-[450px]:w-96 md:w-full shadow-md transition-transform hover:-translate-y-1',
        className,
      ].join(' ')}
      style={{ borderColor: accentColor }}
    >
      <div className="flex items-center justify-center" style={{}}>
        <div
          className="p-6 rounded-2xl"
          style={{
            backgroundColor: `color-mix(in srgb, ${accentColor} ${iconBgOpacity * 100}%, transparent)`,
            color: accentColor,
          }}
        >
          {icon}
        </div>
      </div>

      <h3 className="mt-10 h-15 text-xl font-semibold text-(--text-main)">
        {title}
      </h3>
      <p className="mt-4 text-(--text-muted) tracking-wide">{description}</p>
    </div>
  );
}
