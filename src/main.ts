import { createApp } from "vue";
import App from "./App.vue";
import { darwinStudioUiPlugin } from "./index";

const darwinUiPluginOptions = {
  resetStyles: true,
  googleFonts: [
    {
      family: "Montserrat",
      props: "wght@100&display=swap"
    },
    {
      family: "Inter"
    }
  ],
  // googleFontsText: "tml",
  // googleFontsApi: "https://fonts.googleapis.com/css"
  designTokens: {
    // "color-primary": "#333"
  }
};

createApp(App)
  .use(darwinStudioUiPlugin, darwinUiPluginOptions)
  .mount("#app");
