import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        display: ["Orbitron", "sans-serif"],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        hacker: {
          bg: "#050c15",
          panel: "#0a1625",
          border: "#1a2e44",
          purple: {
            DEFAULT: "#9945FF",
            glow: "#8A2BE2",
            muted: "#684b8c"
          },
          cyan: {
            DEFAULT: "#00FFFF",
            glow: "#00e5ff",
            muted: "#00809c"
          },
          green: {
            DEFAULT: "#42FF00",
            glow: "#39cc00",
            muted: "#1A4D06"
          },
          red: {
            DEFAULT: "#FF3E3E",
            glow: "#ff0000",
            muted: "#661c1c"
          },
          text: {
            primary: "#FFFFFF",
            secondary: "#B3C5D9",
            muted: "#647687"
          }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(circle at 50% 50%, #0c0e1a 0%, #050b18 100%)',
        'cosmic-card': 'linear-gradient(to bottom, rgba(18,22,36,0.8) 0%, rgba(9,14,29,0.8) 100%)',
        'cosmic-glow': 'radial-gradient(circle, rgba(67, 217, 255, 0.15) 0%, rgba(39, 177, 177, 0.05) 35%, rgba(0, 0, 0, 0) 70%)',
        'security-badge': 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 70%)',
        'cyber-grid': 'linear-gradient(rgba(2, 17, 40, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(2, 17, 40, 0.5) 1px, transparent 1px)',
        'cyber-gradient': 'linear-gradient(135deg, #9945FF 0%, #00FFFF 100%)',
        'matrix-effect': 'repeating-linear-gradient(0deg, rgba(0, 255, 0, 0.15) 0px, rgba(0, 0, 0, 0) 2px, rgba(0, 255, 0, 0.15) 2px)',
        'glitch-overlay': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 600 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'4.77\' numOctaves=\'1\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
      },
      animation: {
        'cosmic-float': 'float 6s ease-in-out infinite',
        'cosmic-pulse': 'pulse 3s ease-in-out infinite',
        'cosmic-rotate': 'rotate 10s linear infinite',
        'cosmic-sparkle': 'sparkle 2s ease-in-out infinite',
        'particle-flow': 'flow 20s linear infinite',
        'matrix-flow': 'matrixFlow 20s linear infinite',
        'glitch': 'glitch 2s infinite',
        'grid-scroll': 'gridScroll 20s linear infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'text-flicker': 'textFlicker 3s linear infinite',
        'scan-line': 'scanLine 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        flow: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-100vh) scale(0)' },
        },
        matrixFlow: {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '0px 1000px' }
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        gridScroll: {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '100px 100px' }
        },
        breathe: {
          '0%, 100%': { boxShadow: '0 0 10px 0px rgba(153, 69, 255, 0.7), 0 0 20px 0px rgba(0, 255, 255, 0.5)' },
          '50%': { boxShadow: '0 0 15px 5px rgba(153, 69, 255, 0.9), 0 0 30px 5px rgba(0, 255, 255, 0.7)' }
        },
        textFlicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '94%': { opacity: '0.8' },
          '96%': { opacity: '1' },
          '98%': { opacity: '0.5' },
          '99%': { opacity: '1' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
      },
      boxShadow: {
        'cosmic': '0 8px 32px -8px rgba(67, 217, 255, 0.2)',
        'cosmic-hover': '0 8px 32px -4px rgba(67, 217, 255, 0.3)',
        'cosmic-inner': 'inset 0 0 20px rgba(67, 217, 255, 0.15)',
        'neon-purple': '0 0 5px rgba(153, 69, 255, 0.5), 0 0 20px rgba(153, 69, 255, 0.3)',
        'neon-cyan': '0 0 5px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
        'neon-green': '0 0 5px rgba(66, 255, 0, 0.5), 0 0 20px rgba(66, 255, 0, 0.3)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;