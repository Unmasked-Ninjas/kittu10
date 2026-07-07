interface Props {
  count?: number;
  color?: string;
  size?: number;
  speed?: 'slow' | 'medium' | 'fast';
}

export default function FloatingParticles({ count = 15, color = '#C9A96E', size = 4, speed = 'medium' }: Props) {
  const durations = { slow: [8, 14], medium: [5, 10], fast: [3, 6] };
  const [min, max] = durations[speed];

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const dur = min + Math.random() * (max - min);
        const delay = Math.random() * 6;
        const x = Math.random() * 100;
        const s = (0.5 + Math.random() * 0.8) * size;
        const opacity = 0.2 + Math.random() * 0.5;
        return (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: s,
              height: s,
              background: color,
              left: `${x}%`,
              bottom: '-10px',
              opacity,
              animation: `float-up ${dur}s ease-in ${delay}s infinite`,
              boxShadow: `0 0 ${s * 2}px ${color}80`,
            }}
          />
        );
      })}
    </>
  );
}
