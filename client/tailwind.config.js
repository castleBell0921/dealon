// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // src 폴더와 그 안의 모든 관련 파일들을 감시!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}