import warn from "../utils/warn";

const defaultOptions = {
  resetStyles: true,
  googleFonts: null,
  googleFontsText: null,
  googleFontsApi: "https://fonts.googleapis.com/css"
};

export default {
  install: async (app, options) => {
    // merge user options with the defaults ones
    options = Object.assign(defaultOptions, options);

    if (options.resetStyles) {
      await import("../assets/styles/_reset.scss");
    }

    if (options.googleFonts && options.googleFonts.length) {
      try {
        const WebFont = await import("webfontloader");

        console.log(
          options.googleFonts.map(font => `${font.family}:${font.props || ""}`)
        );

        await WebFont.load({
          google: {
            families: options.googleFonts.map(
              font => `${font.family}${font.props ? ":" + font.props : ""}`
            ),
            text: options.googleFontsText,
            api: options.googleFontsApi
          }
        });
      } catch {
        warn(`Can't load google font "${options.fontFamily}".`);
      }
    }
  }
};
