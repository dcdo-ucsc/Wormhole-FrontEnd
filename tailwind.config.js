import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // important: '#root',
  theme: {
    extend: {},
  },
  plugins: [forms],
  // corePlugins: {
  //   preflight: false,
  // },
};
