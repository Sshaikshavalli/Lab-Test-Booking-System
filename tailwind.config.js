/** Design tokens – shared by all members. Change only after informing the team. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#0b1f24', 900: '#10303a', 700: '#2a4a55', 500: '#5b7882', 300: '#a9bcc2', 100: '#e6eef0' },
        brand: { 50: '#e8f8f5', 100: '#c8efe8', 200: '#93dfd1', 400: '#2fbfa9', 500: '#12a58f', 600: '#0b8776', 700: '#0a6a5e', 900: '#073f38' },
        coral: { 100: '#ffe6df', 400: '#ff8a6b', 500: '#f4694a' },
        sand: { 50: '#fbfaf6', 100: '#f4f1e8' },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,31,36,.05), 0 8px 24px -12px rgba(11,31,36,.18)',
        lift: '0 2px 4px rgba(11,31,36,.06), 0 20px 40px -16px rgba(10,106,94,.35)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
      },
      animation: { float: 'float 6s ease-in-out infinite' },
    },
  },
  plugins: [],
};
