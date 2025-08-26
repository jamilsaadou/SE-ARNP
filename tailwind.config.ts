import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs du Niger
        niger: {
          orange: '#ff6b35',
          green: '#2d5016',
          blue: '#0071ce',
          50: '#fff4f1',
          100: '#ffe6db',
          500: '#ff6b35',
          600: '#e55a2b',
          900: '#2d5016',
        },
        // Couleurs système
        success: '#28a745',
        warning: '#ffc107',
        danger: '#dc3545',
        // CSS variables colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e9ecef',
          500: '#6c757d',
          900: '#343a40',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0,0,0,0.1)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.15)',
        'inset': 'inset 0 2px 4px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        'card': '10px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config

export default config
