import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5044E5", 
      },
      backgroundImage:( {
        'sidebar-gradient': 'linear-gradient(to right, #3C81F6, #92234E)',
      }),
    },
  },
  plugins: [],
};

export default config;
