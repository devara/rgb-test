/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  darkMode: 'class',
  theme   : { extend: {} },
  plugins : [
    plugin(function ({ matchUtilities }) {
      matchUtilities({
        'custom-grid-cols-auto-fit': (value) => {
          return { gridTemplateColumns: `repeat(auto-fit, minmax(${value}, 1fr))` }
        },
      })
    }),
  ],
}
