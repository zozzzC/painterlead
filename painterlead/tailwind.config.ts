import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'green' : '#6CA779',
        'red' : '#E66F6F',
        'orange' : '#E5AD59',
        'dark-grey' : '#343434',
        'light-grey' : '#414141',
        'lightest-grey' : '#505050',
        'text-white' : '#FFFFFF',
      },
    },
  },
  plugins: [],
};
export default config;
