import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const styles: Record<ButtonVariant, string> = {
  primary:
    'bg-gold text-ink shadow-gold hover:bg-gold-light hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'border border-gold/60 bg-white/5 text-white hover:border-gold-light hover:bg-gold/10 hover:-translate-y-0.5',
  ghost: 'text-white/80 hover:bg-white/10 hover:text-white',
};

const base =
  'focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition';

type Shared = {
  variant?: ButtonVariant;
  icon?: ReactNode;
};

type ButtonProps = Shared & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkButtonProps = Shared & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Button = ({ variant = 'primary', icon, children, className = '', ...props }: ButtonProps) => (
  <button className={`${base} ${styles[variant]} ${className}`} {...props}>
    {icon}
    {children}
  </button>
);

export const LinkButton = ({
  variant = 'primary',
  icon,
  children,
  className = '',
  ...props
}: LinkButtonProps) => (
  <a className={`${base} ${styles[variant]} ${className}`} {...props}>
    {icon}
    {children}
  </a>
);
