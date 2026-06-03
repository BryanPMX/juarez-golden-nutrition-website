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
    { emoji: '🥑', top: '13%', left: '7%', sizeClassName: 'px-4 py-3 text-xl lg:text-2xl', alphaClassName: 'bg-ink/42', blurClassName: 'backdrop-blur-md', xRange: 28, yRange: 42, rotation: 13, duration: 6.2, delay: 0.2 },
    { emoji: '🥕', top: '23%', left: '79%', sizeClassName: 'px-4 py-3 text-xl lg:text-2xl', alphaClassName: 'bg-ink/45', blurClassName: 'backdrop-blur-md', xRange: 24, yRange: 38, rotation: 11, duration: 7.1, delay: 0.8 },
    { emoji: '🥬', top: '40%', left: '86%', sizeClassName: 'px-4 py-3 text-xl lg:text-2xl', alphaClassName: 'bg-ink/40', blurClassName: 'backdrop-blur-md', xRange: 22, yRange: 34, rotation: 10, duration: 6.8, delay: 1.1 },
    { emoji: '🍅', top: '62%', left: '10%', sizeClassName: 'px-4 py-3 text-xl lg:text-2xl', alphaClassName: 'bg-ink/38', blurClassName: 'backdrop-blur-md', xRange: 26, yRange: 32, rotation: 11, duration: 7.6, delay: 0.5 },
    { emoji: '🥦', top: '73%', left: '82%', sizeClassName: 'px-4 py-3 text-xl lg:text-2xl', alphaClassName: 'bg-ink/44', blurClassName: 'backdrop-blur-md', xRange: 23, yRange: 30, rotation: 10, duration: 6.9, delay: 1.5 },
    { emoji: '🥚', top: '82%', left: '22%', sizeClassName: 'px-3.5 py-2.5 text-lg lg:text-xl', alphaClassName: 'bg-ink/35', blurClassName: 'backdrop-blur-md', xRange: 22, yRange: 28, rotation: 8, duration: 7.4, delay: 0.9 },
    { emoji: '🍤', top: '17%', left: '60%', sizeClassName: 'px-3.5 py-2.5 text-lg lg:text-xl', alphaClassName: 'bg-ink/34', blurClassName: 'backdrop-blur-md', xRange: 21, yRange: 30, rotation: 8, duration: 8.1, delay: 1.8 },
    { emoji: '🐟', top: '54%', left: '69%', sizeClassName: 'px-3.5 py-2.5 text-lg lg:text-xl', alphaClassName: 'bg-ink/34', blurClassName: 'backdrop-blur-md', xRange: 20, yRange: 26, rotation: 7, duration: 8.3, delay: 0.4 },
    { emoji: '🍗', top: '32%', left: '15%', sizeClassName: 'px-3.5 py-2.5 text-lg lg:text-xl', alphaClassName: 'bg-ink/33', blurClassName: 'backdrop-blur-md', xRange: 24, yRange: 34, rotation: 9, duration: 7.3, delay: 1.3 },
    { emoji: '🥩', top: '76%', left: '58%', sizeClassName: 'px-3.5 py-2.5 text-lg lg:text-xl', alphaClassName: 'bg-ink/33', blurClassName: 'backdrop-blur-md', xRange: 22, yRange: 29, rotation: 8, duration: 7.8, delay: 1.9 },
  ],
  section: [
    { emoji: '🥒', top: '15%', left: '7%', sizeClassName: 'px-3.5 py-2.5 text-lg lg:text-xl', alphaClassName: 'bg-ink/30', blurClassName: 'backdrop-blur-sm', xRange: 18, yRange: 28, rotation: 8, duration: 8.4, delay: 0.3 },
    { emoji: '🥕', top: '22%', left: '88%', sizeClassName: 'px-3.5 py-2.5 text-lg', alphaClassName: 'bg-ink/28', blurClassName: 'backdrop-blur-sm', xRange: 16, yRange: 24, rotation: 7, duration: 8.9, delay: 1.2 },
    { emoji: '🥩', top: '47%', left: '84%', sizeClassName: 'px-3.5 py-2.5 text-lg', alphaClassName: 'bg-ink/26', blurClassName: 'backdrop-blur-sm', xRange: 15, yRange: 21, rotation: 6, duration: 9.1, delay: 0.9 },
    { emoji: '🥬', top: '67%', left: '8%', sizeClassName: 'px-3.5 py-2.5 text-lg lg:text-xl', alphaClassName: 'bg-ink/28', blurClassName: 'backdrop-blur-sm', xRange: 17, yRange: 25, rotation: 7, duration: 8.6, delay: 1.7 },
    { emoji: '🍅', top: '79%', left: '78%', sizeClassName: 'px-3.5 py-2.5 text-lg', alphaClassName: 'bg-ink/24', blurClassName: 'backdrop-blur-sm', xRange: 14, yRange: 20, rotation: 6, duration: 9.7, delay: 0.5 },
    { emoji: '🥚', top: '35%', left: '14%', sizeClassName: 'px-3 py-2 text-base lg:text-lg', alphaClassName: 'bg-ink/24', blurClassName: 'backdrop-blur-sm', xRange: 14, yRange: 21, rotation: 6, duration: 9.3, delay: 1.5 },
    { emoji: '🐟', top: '26%', left: '60%', sizeClassName: 'px-3 py-2 text-base lg:text-lg', alphaClassName: 'bg-ink/24', blurClassName: 'backdrop-blur-sm', xRange: 15, yRange: 22, rotation: 6, duration: 8.8, delay: 0.8 },
    { emoji: '🍗', top: '74%', left: '54%', sizeClassName: 'px-3 py-2 text-base lg:text-lg', alphaClassName: 'bg-ink/24', blurClassName: 'backdrop-blur-sm', xRange: 15, yRange: 20, rotation: 6, duration: 9.5, delay: 1.9 },
  ],
  calm: [
    { emoji: '🥑', top: '12%', left: '4%', sizeClassName: 'px-3 py-2 text-base lg:text-lg', alphaClassName: 'bg-ink/20', blurClassName: 'backdrop-blur-sm', xRange: 12, yRange: 18, rotation: 6, duration: 10.8, delay: 0.4 },
    { emoji: '🐟', top: '18%', left: '91%', sizeClassName: 'px-3 py-2 text-base lg:text-lg', alphaClassName: 'bg-ink/18', blurClassName: 'backdrop-blur-sm', xRange: 11, yRange: 16, rotation: 5, duration: 11.6, delay: 1.1 },
    { emoji: '🥦', top: '52%', left: '94%', sizeClassName: 'px-3 py-2 text-base lg:text-lg', alphaClassName: 'bg-ink/18', blurClassName: 'backdrop-blur-sm', xRange: 10, yRange: 15, rotation: 5, duration: 12.1, delay: 0.7 },
    { emoji: '🍗', top: '70%', left: '5%', sizeClassName: 'px-3 py-2 text-base lg:text-lg', alphaClassName: 'bg-ink/20', blurClassName: 'backdrop-blur-sm', xRange: 11, yRange: 16, rotation: 5, duration: 11.3, delay: 1.4 },
    { emoji: '🥕', top: '82%', left: '88%', sizeClassName: 'px-3 py-2 text-base lg:text-lg', alphaClassName: 'bg-ink/18', blurClassName: 'backdrop-blur-sm', xRange: 10, yRange: 14, rotation: 4, duration: 12.5, delay: 1.8 },
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
