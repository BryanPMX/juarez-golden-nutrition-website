import { useEffect, useState } from 'react';

export const useCountUp = (target: number, duration = 1200) => {
  const [value, setValue] = useState(0);
  const [node, setNode] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      let frame = 0;
      const frames = Math.max(1, Math.round(duration / 16));
      const tick = () => {
        frame += 1;
        const progress = Math.min(frame / frames, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };

      tick();
      observer.unobserve(node);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [duration, node, target]);

  return [setNode, value] as const;
};
