/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core NURAKI palette — moody, luxe, editorial
        ink: '#0a0908',        // near-black background
        'ink-soft': '#12100e', // raised panels
        espresso: '#2a1f1a',   // deep warm brown
        mocha: '#4a382e',      // brand mocha/taupe brown
        taupe: '#a08a78',      // warm taupe text
        'taupe-dim': '#7c6a5c',
        cream: '#f4ece1',      // headline cream
        'cream-dim': '#d8ccbc',
        wine: '#5e2230',       // burgundy / wine
        'wine-deep': '#3d1520',
        gold: '#c9a24b',       // signature gold
        'gold-soft': '#e2c98a',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.34em',
        wide2: '0.2em',
      },
      maxWidth: {
        shell: '1280px',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
        floatUp: 'floatUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
      },
    },
  },
  plugins: [],
}
