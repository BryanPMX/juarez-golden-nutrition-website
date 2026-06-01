import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#F0D078',
          soft: '#F7E8AE',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          card: '#1A1A1A',
          border: '#2D2D2D',
        },
        leaf: {
          DEFAULT: '#5EA46B',
          light: '#B7D98B',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        label: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 20px 70px rgba(201, 168, 76, 0.22)',
      },
    },
  },
  plugins: [],
} satisfies Config;
