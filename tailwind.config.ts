import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        heading: ['var(--font-heading)'],
        hero: ['var(--font-hero)'],
        handwriting: ['var(--font-handwriting)'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #99e1d9 0%, #83c9f4 100%)',
        'gradient-secondary':
          'linear-gradient(135deg, #593f62 0%, #805f93 100%)',
        'gradient-soft': 'linear-gradient(135deg, #f9f9f9 0%, #fafbfc 100%)',
        'gradient-hero':
          'linear-gradient(135deg, #99e1d9 0%, #83c9f4 50%, #593f62 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },

  plugins: [require('tailwindcss-animate')],
};

export default config;
