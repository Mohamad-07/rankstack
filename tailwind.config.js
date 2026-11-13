/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./Data/**/*.{js,ts,jsx,tsx,mdx}",
    "./constant/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        'custom': '0px 2px 70px 0px rgba(110, 130, 208, 0.18)',
        soft: '0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px -12px rgba(15, 23, 42, 0.16)',
        lift: '0 2px 4px rgba(15, 23, 42, 0.04), 0 24px 48px -16px rgba(15, 23, 42, 0.22)',
        glow: '0 18px 48px -20px rgba(79, 70, 229, 0.55)',
      },
      animation: {
        'zoom-in': 'zoomIn 0.7s ease-in-out forwards',
        blob: 'blob 7s infinite',
        'fade-up': 'fadeUp 0.6s ease-out both',
      },
      keyframes: {
        zoomIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
