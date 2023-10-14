/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    fontSize: {
      xs: ['10px', '12px'],
      sm: ['12px', '16px'],
      md: ['14px', '18px'],
      lg: ['16px', '24px'],
      xl: ['20px', '24px'],
      '2xl': ['24px', '24px'],
      '3xl': ['34px', '32px'],
      '4xl': ['38px', '32px'],
      '5xl': ['40px', '44px'],
      '6xl': ['64px', '64px'],
      '9xl': ['96px', '149px'],
      logoSize: ['32px', '44px'],
      logoMobile: ['20px', '28px'],
      cartDesktop: ['28px', '40px'],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // primary: {
        //   DEFAULT: 'hsl(var(--primary))',
        //   foreground: 'hsl(var(--primary-foreground))',
        // },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar))',
          foreground: 'hsl(var(--sidebar-foreground))',
        },
        primary: '#3c888D',
        primaryDark: '#2f4a53',
        primarySecond: '#8ab8bb',
        brand50: '#9dc3c6',
        brand100: '#ff9900',
        brand150: '#f47979',
        brand200: '#fde4e4',
        brand250: '#eaeaea',
        brand300: '#d8e5e3',
        brand350: '#cccccc',
        brand400: '#000000',
        brand450: '#ffffff',
        brand500: '#1877f2',
        brand600: '#f6f6f6',
        brand650: '#d6e6e7',
        brand700: '#666666',
        brand750: '#47259c',
        brand800: '#bfe88c',
        brand850: '#da5627',
        brand900: '#d7dcce',
        brand950: '#9cc865',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        backGroundImg: "url('/images/backGroundImg.png')",
        folderLeft: "url('/images/folderLeft.png')",
        folderLeftIMG: "url('/images/folderLeftIMG.png')",
        folderRight: "url('/images/folderRight.png')",
        folderRightIMG: "url('/images/folderRightIMG.png')",
        secondBG: "url('/images/secondBG.png')",
        firstBG: "url('/images/firstBG.png')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
