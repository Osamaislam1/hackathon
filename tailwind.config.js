/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-cyan': 'var(--neon-cyan)',
        'neon-purple': 'var(--neon-purple)',
        'neon-green': 'var(--neon-green)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};