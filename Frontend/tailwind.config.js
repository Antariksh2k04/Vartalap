import daisyui from "daisyui";
import themes from "daisyui/theme/object";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
<<<<<<< HEAD
    extend: {},
=======
    extend: {
      
    },
>>>>>>> bf9ad46341d131047f0cb2ffe7f8d72d7793f957
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
<<<<<<< HEAD
  },
};
=======
    defaultTheme: "light",
    darkTheme: "dark",
  }
}
>>>>>>> bf9ad46341d131047f0cb2ffe7f8d72d7793f957
