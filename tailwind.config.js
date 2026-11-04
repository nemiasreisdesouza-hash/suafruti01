/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '390px',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        suafruti: {
          950: '#072412',
          900: '#0B361B',
          800: '#104924',
          700: '#166130',
          600: '#1D7A3C',
          500: '#27964B',
          400: '#49B869',
          300: '#7BD492',
          200: '#B5E8C1',
          100: '#E1F6E6',
          50: '#F3FAF4',
        },
        cream: {
          50: '#FCFDF9',
          100: '#F6FAF1',
          200: '#ECF4E2',
        },
        berry: {
          600: '#D41E2B',
          500: '#E62E3B',
          100: '#FFE8EA',
        },
        citrus: {
          500: '#F59E0B',
          400: '#FBBF24',
          100: '#FEF3C7',
        },
      },
      boxShadow: {
        botanical: '0 14px 38px -12px rgba(11, 54, 27, 0.14), 0 4px 12px -4px rgba(11, 54, 27, 0.06)',
        'botanical-lg': '0 24px 54px -14px rgba(11, 54, 27, 0.24), 0 8px 20px -6px rgba(11, 54, 27, 0.10)',
        glow: '0 10px 30px -6px rgba(39, 150, 75, 0.45)',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        slideUpSheet: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'float-slow': 'floatSlow 5s ease-in-out infinite',
        'pop-in': 'popIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUpSheet 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};
