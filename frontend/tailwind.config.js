/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#1E5E45', /* 从参考图中提取的主题绿 */
        'brand-light': '#F3F6F5', /* 护眼浅灰底色 */
        'brand-dark': '#133D2D',
        'brand-gray': '#8C9491',
      }
    },
  },
  plugins: [],
}
