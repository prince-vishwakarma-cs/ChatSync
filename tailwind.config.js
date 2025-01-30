/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			'blurple': '#7289da',
  			'not-quite-black': '#23272a',
  			'dark': '#2c2f33',
  			'lighter-dark': '#45494e',
  			'full-white': '#ffffff',
  			'grey-white': '#B9BBBE',
  			'grey-dark': '#242629',
  			'actually-black': '#000000',
  			'fantastic-green': '#00ae7a',
  			'not-so-dark': '#2b2d31',
  			'dull-text': 'rgb(128, 132, 142)',
  			'light-gray-divider': '#3f4147',
  			'light-gray': '949ba4',
  			'hover-gray': 'rgb(53, 55, 60)',
  			'hover-text': '#dbdee1',
  			'yellow': 'rgb(241, 196, 15)',
  			'time-color': 'rgb(148, 155, 164)',
  			'background': '#131314',
  			'selected-bg': '#1e1f20',
  			'text-on-selected': '#bdc1c6',
  			'text-secondary': '#71767b',
  			'border': '#2f3336',
  			'color-accent': '#add7f1',
  			'text-primary': '#e7e9ea',
  			'hover-bg': '#303131',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-animate")],
};
