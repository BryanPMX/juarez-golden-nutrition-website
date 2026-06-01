import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const particles = ['🥑', '🥕', '🥬', '🍅', '🍊', '🥦'];

export const FoodParticles = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.to('.food-particle', {
        y: 'random(-24, 24)',
        x: 'random(-16, 16)',
        rotate: 'random(-10, 10)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.18,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((particle, index) => (
        <span
          key={`${particle}-${index}`}
          className="food-particle absolute hidden rounded-full border border-white/10 bg-ink/60 px-3 py-2 text-xl shadow-2xl backdrop-blur md:block"
          style={{
            top: `${18 + index * 11}%`,
            right: `${8 + (index % 3) * 12}%`,
          }}
        >
          {particle}
        </span>
      ))}
    </div>
  );
};
