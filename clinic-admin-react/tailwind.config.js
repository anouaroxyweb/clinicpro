// tailwind.config.js
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        clinic: {
          bg: '#ffffff',
          dark: '#0F172A',     // slate-900
          primary: '#2563EB',  // medical blue
          primaryLight: '#38BDF8',
          text: '#0F172A',
          subt: '#64748B',
          card: '#F8FAFC'
        }
      }
    }
  },
  plugins: [],
}

