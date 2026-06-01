import { useCountUp } from '../../hooks/useCountUp';

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  label: string;
};

export const AnimatedCounter = ({ value, suffix = '', label }: AnimatedCounterProps) => {
  const [setCounterNode, counterValue] = useCountUp(value);

  return (
    <div className="min-w-0 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-4 text-center">
      <div className="font-display text-4xl font-bold text-gold-light">
        <span ref={setCounterNode}>{counterValue}</span>
        {suffix}
      </div>
      <div className="mt-1 text-sm text-white/70">{label}</div>
    </div>
  );
};
