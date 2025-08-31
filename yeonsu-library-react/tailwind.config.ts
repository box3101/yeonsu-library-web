import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 연수구 도서관 색상 시스템
        primary: {
          DEFAULT: '#3c79c2',
          50: '#f0f6ff',
          100: '#e1edfe',
          200: '#c8ddfd',
          300: '#a6c7fb',
          400: '#82a8f7',
          500: '#648bf2',
          600: '#4c6fe7',
          700: '#3c79c2',
          800: '#2a5aa0',
          900: '#1d4178',
        },
        secondary: {
          DEFAULT: '#063a74',
          50: '#f0f5ff',
          100: '#e1ebff',
          200: '#c3d6ff',
          300: '#9bb8ff',
          400: '#6b8fff',
          500: '#3d63ff',
          600: '#1a3fff',
          700: '#063a74',
          800: '#052f5d',
          900: '#042247',
        },
        // 기관별 색상
        institution: {
          all: '#008f37',
          yeonsu: '#a3cf62',
          songdo: '#8e63aa',
          cheonghak: '#7fa7d7',
          haedoji: '#ef6601',
          haechansol: '#189ba7',
          sunhak: '#ffacc1',
          nuri: '#7b19d7',
        },
        // 시스템 색상
        border: '#ecf2fe',
        text: {
          DEFAULT: '#333333',
          muted: '#666666',
          light: '#999999',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      screens: {
        'xs': '475px',
        'mobile': '900px',
        'desktop': '1200px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;