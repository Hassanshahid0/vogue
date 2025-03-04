// /** @type {import('tailwindcss').Config} */
// import tailwindScrollbar from 'tailwind-scrollbar';

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       gridTemplateColumns:{
//         'auto':'repeat(auto-fill, minmax(200px, 1fr))'
//       },
//       colors:{
//         'primary':'#5F6FFF'
//       }
//     },
//   },
//   plugins: [ require('tailwind-scrollbar'),],
// };



/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      colors: {
        'primary': '#5F6FFF',
      },
    },
  },
  plugins: [tailwindScrollbar],
};
