import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type FoodParticlePreset = 'hero' | 'section' | 'calm';

type ParticleConfig = {
  emoji: string;
  top: string;
  left: string;
  sizeClassName: string;
  alphaClassName: string;
  blurClassName: string;
  xRange: number;
  yRange: number;
  rotation: number;
  duration: number;
  delay: number;
};

type FoodParticlesProps = {
  preset?: FoodParticlePreset;
};

const particlePresets: Record<FoodParticlePreset, ParticleConfig[]> = {
  hero: [
    { emoji: '🥑', top: '14%', left: '8%', sizeClassName: 'px-3 py-2 text-lg lg:text-xl', alphaClassName: 'bg-ink/42', blurClassName: 'backdrop-blur-md', xRange: 18, yRange: 28, rotation: 9, duration: 8.8, delay: 0.2 },
    { emoji: '🥕', top: '24%', left: '79%', sizeClassName: 'px-3 py-2 text-lg lg:text-xl', alphaClassName: 'bg-ink/45', blurClassName: 'backdrop-blur-md', xRange: 16, yRange: 26, rotation: 8, duration: 10.4, delay: 0.8 },
    { emoji: '🥬', top: '42%', left: '86%', sizeClassName: 'px-3 py-2 text-lg', alphaClassName: 'bg-ink/40', blurClassName: 'backdrop-blur-md', xRange: 14, yRange: 24, rotation: 7, duration: 9.6, delay: 1.1 },
    { emoji: '🍅', top: '62%', left: '10%', sizeClassName: 'px-3 py-2 text-lg', alphaClassName: 'bg-ink/38', blurClassName: 'backdrop-blur-md', xRange: 18, yRange: 22, rotation: 8, duration: 11.2, delay: 0.5 },
    { emoji: '🥦', top: '72%', left: '82%', sizeClassName: 'px-3 py-2 text-lg lg:text-xl', alphaClassName: 'bg-ink/44', blurClassName: 'backdrop-blur-md', xRange: 15, yRange: 20, rotation: 7, duration: 9.9, delay: 1.5 },
    { emoji: '🥚', top: '84%', left: '22%', sizeClassName: 'px-3 py-2 text-base lg:text-lg', alphaClassName: 'bg-ink/35', blurClassName: 'backdrop-blur-md', xRange: 14, yRange: 18, rotation: 6, duration: 10.7, delay: 0.9 },
    { emoji: '🍤', top: '18%', left: '60%', sizeClassName: 'px-3 py-2 text-base lg:text-lg', alphaClassName: 'bg-ink/34', blurClassName: 'backdrop-blur-md', xRange: 13, yRange: 20, rotation: 6, duration: 11.5, delay: 1.8 },
    { emoji: '🐟', top: '54%', left: '69%', sizeClassName: 'px-3 py-2 text-base lg:text-lg', alphaClassName: 'bg-ink/34', blurClassName: 'backdrop-blur-md', xRange: 12, yRange: 18, rotation: 5, duration: 12.2, delay: 0.4 },
  ],
  section: [
    { emoji: '🥒', top: '16%', left: '7%', sizeClassName: 'px-3 py-2 text-base lg:text-lg', alphaClassName: 'bg-ink/30', blurClassName: 'backdrop-blur-sm', xRange: 12, yRange: 18, rotation: 6, duration: 11.8, delay: 0.3 },
    { emoji: '🥕', top: '22%', left: '88%', sizeClassName: 'px-3 py-2 text-base', alphaClassName: 'bg-ink/28', blurClassName: 'backdrop-blur-sm', xRange: 10, yRange: 16, rotation: 5, duration: 12.6, delay: 1.2 },
    { emoji: '🥩', top: '48%', left: '84%', sizeClassName: 'px-3 py-2 text-base', alphaClassName: 'bg-ink/26', blurClassName: 'backdrop-blur-sm', xRange: 10, yRange: 14, rotation: 4, duration: 13.4, delay: 0.9 },
    { emoji: '🥬', top: '68%', left: '8%', sizeClassName: 'px-3 py-2 text-base lg:text-lg', alphaClassName: 'bg-ink/28', blurClassName: 'backdrop-blur-sm', xRange: 11, yRange: 17, rotation: 5, duration: 12.1, delay: 1.7 },
    { emoji: '🍅', top: '78%', left: '78%', sizeClassName: 'px-3 py-2 text-base', alphaClassName: 'bg-ink/24', blurClassName: 'backdrop-blur-sm', xRange: 9, yRange: 13, rotation: 4, duration: 14.2, delay: 0.5 },
    { emoji: '🥚', top: '36%', left: '14%', sizeClassName: 'px-3 py-2 text-sm lg:text-base', alphaClassName: 'bg-ink/24', blurClassName: 'backdrop-blur-sm', xRange: 9, yRange: 14, rotation: 4, duration: 13.1, delay: 1.5 },
  ],
  calm: [
    { emoji: '🥑', top: '12%', left: '5%', sizeClassName: 'px-2.5 py-1.5 text-sm lg:text-base', alphaClassName: 'bg-ink/20', blurClassName: 'backdrop-blur-sm', xRange: 8, yRange: 12, rotation: 4, duration: 14.5, delay: 0.4 },
    { emoji: '🐟', top: '18%', left: '91%', sizeClassName: 'px-2.5 py-1.5 text-sm lg:text-base', alphaClassName: 'bg-ink/18', blurClassName: 'backdrop-blur-sm', xRange: 7, yRange: 11, rotation: 3, duration: 15.6, delay: 1.1 },
    { emoji: '🥦', top: '52%', left: '94%', sizeClassName: 'px-2.5 py-1.5 text-sm lg:text-base', alphaClassName: 'bg-ink/18', blurClassName: 'backdrop-blur-sm', xRange: 7, yRange: 10, rotation: 3, duration: 16.4, delay: 0.7 },
    { emoji: '🍗', top: '70%', left: '6%', sizeClassName: 'px-2.5 py-1.5 text-sm lg:text-base', alphaClassName: 'bg-ink/20', blurClassName: 'backdrop-blur-sm', xRange: 7, yRange: 11, rotation: 3, duration: 15.2, delay: 1.4 },
  ],
};

export const FoodParticles = ({ preset = 'section' }: FoodParticlesProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const particles = particlePresets[preset];

  useEffect(() => {
    if (!rootRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const particleElements = rootRef.current.querySelectorAll<HTMLElement>('[data-food-particle]');
    const ctx = gsap.context(() => {
      particleElements.forEach((particle, index) => {
        const config = particles[index];
        if (!config) return;

        gsap.to(particle, {
          x: config.xRange,
          y: config.yRange,
          rotate: config.rotation,
          duration: config.duration,
          delay: config.delay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [particles]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(circle_at_center,black_12%,black_76%,transparent_100%)]"
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <span
          key={`${preset}-${particle.emoji}-${particle.top}-${particle.left}`}
          data-food-particle
          className={`absolute hidden rounded-full border border-white/10 text-white/90 shadow-[0_18px_50px_rgba(0,0,0,0.28)] will-change-transform sm:block ${particle.sizeClassName} ${particle.alphaClassName} ${particle.blurClassName}`}
          style={{ top: particle.top, left: particle.left }}
        >
          {particle.emoji}
        </span>
      ))}
    </div>
  );
};
