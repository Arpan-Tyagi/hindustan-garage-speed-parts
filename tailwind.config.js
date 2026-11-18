import defaultTheme from 'tailwindcss/defaultTheme.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '390px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        canvas: {
          alabaster: '#F6F5F0',
        },
        surface: {
          white: '#FFFFFF',
          limestone: '#EAE8E1',
          hover: '#F2EFE9',
        },
        hairline: {
          grid: '#DCD9D0',
          subtle: '#E6E4DE',
        },
        ink: {
          carbon: '#111215',
          graphite: '#52565E',
          muted: '#717680',
          subtle: '#9A9EA6',
        },
        crimson: {
          DEFAULT: '#B81D13',
          hover: '#9E1810',
          tint: '#FDF2F1',
          border: '#F4C7C5',
        },
        cobalt: {
          DEFAULT: '#0F4C81',
          hover: '#0C3C66',
          tint: '#F0F6FB',
          border: '#C0D5E7',
          dark: '#082742',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Inter Tight"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        'spec': '2px',
        'sm': '2px',
        'md': '4px',
        'lg': '6px',
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'tight': '-0.025em',
        'spec': '0.12em',
      },
      boxShadow: {
        'bezel': 'inset 0 1px 1px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(17, 18, 21, 0.04)',
        'elevated': '0 10px 30px -10px rgba(17, 18, 21, 0.06), 0 1px 3px rgba(17, 18, 21, 0.03)',
        'modal': '0 25px 60px -15px rgba(17, 18, 21, 0.18)',
        'inner-glow': 'inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
      }
    },
  },
  plugins: [],
}
