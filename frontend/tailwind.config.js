/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        racing: {
          red     : "#e8000d",
          "red-dim": "#7a0008",
          "red-glow": "#ff1a1a",
          black   : "#000000",
          "dark"  : "#050505",
          "darker": "#030303",
          chrome  : "#cccccc",
          carbon  : "#0d0d0d",
        },
      },
      fontFamily: {
        racing  : ["var(--font-racing)","monospace"],
        sans    : ["var(--font-inter)","system-ui","sans-serif"],
        mono    : ["var(--font-mono)","monospace"],
      },
      animation: {
        "pulse-red"   : "pulseRed 1.5s ease-in-out infinite",
        "scan-line"   : "scanLine 3s linear infinite",
        "hud-flicker" : "hudFlicker 0.15s ease infinite",
        "speed-line"  : "speedLine 0.4s linear infinite",
      },
      keyframes: {
        pulseRed  : { "0%,100%": { opacity: 1, boxShadow: "0 0 8px #e8000d" }, "50%": { opacity: 0.5, boxShadow: "0 0 20px #e8000d" } },
        scanLine  : { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100vh)" } },
        hudFlicker: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.85 } },
        speedLine : { "0%": { transform: "translateZ(-200px) scaleX(0)" }, "100%": { transform: "translateZ(0) scaleX(1)" } },
      },
      backgroundImage: {
        "gradient-radial"  : "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic"   : "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "neon-grid"        : "linear-gradient(rgba(232,0,13,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,0,13,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-40" : "40px 40px",
      },
    },
  },
  plugins: [],
};
