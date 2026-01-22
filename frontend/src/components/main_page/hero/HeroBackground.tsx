'use client';

export default function HeroBackground() {
  const circles = [
    {
      id: 1,
      left: '5%',
      top: '15%',
      size: 140,
      background: 'rgba(212, 168, 154, 0.6)',
      delay: 0,
    },
    {
      id: 2,
      right: '5%',
      top: '10%',
      size: 120,
      background: 'rgba(255, 255, 255, 0.2)',
      delay: 0.5,
    },
    {
      id: 3,
      right: '10%',
      bottom: '25%',
      size: 100,
      background: 'rgba(232, 196, 184, 0.4)',
      delay: 1,
    },
    {
      id: 4,
      right: '20%',
      bottom: '10%',
      size: 80,
      background: 'rgba(139, 157, 195, 0.3)',
      delay: 1.5,
    },
  ];

  const stars = [
    { id: 1, left: '12%', top: '18%', delay: 0, size: 48 },
    { id: 2, left: '22%', top: '30%', delay: 0.3, size: 24 },
    { id: 3, right: '25%', top: '20%', delay: 0.6, size: 16 },
    { id: 4, right: '8%', top: '45%', delay: 0.9, size: 48 },
    { id: 5, left: '48%', top: '12%', delay: 1.2, size: 20 },
  ];

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-24px); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(0.8); }
          }
        `}
      </style>

      <div className="absolute inset-0 -z-10 overflow-hidden bg-linear-to-br from-purple-400 via-pink-400 to-blue-400 opacity-90">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className="absolute rounded-full"
            style={{
              left: circle.left,
              right: circle.right,
              top: circle.top,
              bottom: circle.bottom,
              width: circle.size,
              height: circle.size,
              background: circle.background,
              backdropFilter: 'blur(4px)',
              animation: `float 3s ease-in-out infinite`,
              animationDelay: `${circle.delay}s`,
            }}
          />
        ))}

        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              left: star.left,
              right: star.right,
              top: star.top,
              animation: `twinkle 2s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          >
            <svg
              width={star.size}
              height={star.size}
              viewBox="0 0 24 24"
              fill="#ffd93d"
            >
              <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
              {star.size >= 20 && (
                <path d="M19 14L19.75 16.25L22 17L19.75 17.75L19 20L18.25 17.75L16 17L18.25 16.25L19 14Z" />
              )}
            </svg>
          </div>
        ))}
      </div>
    </>
  );
}
