// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        card: "oklch(var(--card))",
        'card-foreground': "oklch(var(--card-foreground))",
        popover: "oklch(var(--popover))",
        'popover-foreground': "oklch(var(--popover-foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary))",
          foreground: "oklch(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted))",
          foreground: "oklch(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "oklch(var(--accent))",
          foreground: "oklch(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive))",
          foreground: "oklch(var(--destructive-foreground))",
        },
        border: "oklch(var(--border))", // <-- THIS IS THE KEY FOR border-border
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
        // Add your custom chart and sidebar colors if you plan to use them as Tailwind classes
        // Example for chart-1:
        'chart-1': "oklch(var(--chart-1))",
        'chart-2': "oklch(var(--chart-2))",
        'chart-3': "oklch(var(--chart-3))",
        'chart-4': "oklch(var(--chart-4))",
        'chart-5': "oklch(var(--chart-5))",
        sidebar: "oklch(var(--sidebar))",
        'sidebar-foreground': "oklch(var(--sidebar-foreground))",
        'sidebar-primary': "oklch(var(--sidebar-primary))",
        'sidebar-primary-foreground': "oklch(var(--sidebar-primary-foreground))",
        'sidebar-accent': "oklch(var(--sidebar-accent))",
        'sidebar-accent-foreground': "oklch(var(--sidebar-accent-foreground))",
        'sidebar-border': "oklch(var(--sidebar-border))",
        'sidebar-ring': "oklch(var(--sidebar-ring))",
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: `calc(var(--radius) - 4px)`,
        xl: `calc(var(--radius) + 4px)`, // Added from your globals.css @theme block
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Assuming this is needed for 'tw-animate-css'
  ],
};