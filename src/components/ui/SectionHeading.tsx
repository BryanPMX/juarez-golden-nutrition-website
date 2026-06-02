type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: 'left' | 'center';
};

export const SectionHeading = ({ eyebrow, title, copy, align = 'left' }: SectionHeadingProps) => (
  <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
    {copy ? <p className="mt-4 text-base leading-7 text-white/70 sm:mt-5 sm:text-lg sm:leading-8">{copy}</p> : null}
  </div>
);
