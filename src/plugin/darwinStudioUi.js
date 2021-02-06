import consoleWarn from "../utils/consoleWarn";

const defaultOptions = {
  resetStyles: true,
  googleFonts: null,
  googleFontsText: null,
  googleFontsApi: "https://fonts.googleapis.com/css"
};

export default {
  install: async (app, options) => {
    // merge user options with default ones
    options = Object.assign(defaultOptions, options);

    if (options.resetStyles) {
      await import("../assets/styles/_reset.scss");
    }

    if (options.googleFonts && options.googleFonts.length) {
      try {
        const WebFont = await import("webfontloader");

        await WebFont.load({
          google: {
            families: options.googleFonts.map(
              font => `${font.family}${font.props ? ":" + font.props : ""}`
            ),
            text: options.googleFontsText,
            api: options.googleFontsApi
          }
        });
      } catch (e) {
        consoleWarn(`Can't load google fonts "${options.googleFonts}".`, e);
      }
    }
  }
};
