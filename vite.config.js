import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // html2canvas এরর ফিক্স করার জন্য আমরা ডিফল্ট কালারগুলোকে Hex দিয়ে ওভাররাইড করছি
      colors: {
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a", // Card border & text
          700: "#15803d", // Text
          800: "#166534", // Pattern
          900: "#14532d", // Pattern background
        },
        emerald: {
          900: "#064e3b", // Sunrise background
          950: "#022c22", // Wave background
        },
        red: {
          500: "#ef4444", // Sun gradient
          600: "#dc2626", // Flag circle
          700: "#b91c1c",
        },
        yellow: {
          400: "#facc15", // Text highlight
        },
        indigo: {
          50: "#eef2ff",
          100: "#e0e7ff",
          600: "#4f46e5",
        },
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          600: "#ea580c",
        },
        slate: {
          100: "#f1f5f9",
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
