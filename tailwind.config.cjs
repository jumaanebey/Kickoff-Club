module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Hybrid Colors: Warm & Cozy palette with modern naming
        primary: {
          50: '#f4f7f3',
          100: '#e8f0e6',
          200: '#cde7d9', // sage
          300: '#b3ddc8',
          400: '#98d4b6',
          500: '#7dc9a5',
          600: '#6bb896',
          700: '#5a9d7f',
          800: '#4a8269',
          900: '#3c6856'
        },
        secondary: {
          50: '#0f2c52',
          100: '#0b2545', // navy
          200: '#091f3d',
          300: '#071934',
          400: '#05122a',
          500: '#040d21',
          600: '#030a1b',
          700: '#020815',
          800: '#01050e',
          900: '#010307'
        },
        accent: {
          50: '#fdf6eb',
          100: '#faebd1',
          200: '#f5d7a3',
          300: '#f0c375',
          400: '#ebaf47',
          500: '#e6b85c', // warmGold
          600: '#d49d39',
          700: '#b8852f',
          800: '#9c6d25',
          900: '#80551b'
        },
        blush: {
          50: '#fffbfa',
          100: '#fef6f4',
          200: '#fce8e4', // blush
          300: '#f9d1c8',
          400: '#f5baac',
          500: '#f2a390',
          600: '#ee8c74',
          700: '#ea7558',
          800: '#e65e3c',
          900: '#e24720'
        },
        rose: {
          50: '#fff8f9',
          100: '#fff1f2',
          200: '#ffe0e2',
          300: '#ffbfc3',
          400: '#ff9ea4',
          500: '#ff9aa2', // rose
          600: '#ff6670',
          700: '#ff323f',
          800: '#e51e2b',
          900: '#b8171f'
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
        warning: {
          50: '#fefce8',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        },
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a'
        },
        // Direct color references for backward compatibility
        navy: '#0b2545',
        warmGold: '#e6b85c',
        sage: '#cde7d9',
        blushColor: '#fce8e4',
        roseColor: '#ff9aa2'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }]
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem'
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [],
}
