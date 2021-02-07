import consoleWarn from "../utils/consoleWarn";

// TODO: add descr
const defaultOptions = {
  resetStyles: true,
  googleFonts: null, // TODO: add example
  googleFontsText: null, // TODO: add example
  googleFontsApi: "", // e.g. "https://fonts.googleapis.com/css",
  designTokens: {} // e.g. "color-primary": "navy"
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

    if (options.designTokens && Object.keys(options.designTokens).length) {
      if (process.browser) {
        let root = document.documentElement;
        // root.style.setProperty('--mouse-x', e.clientX + "px");
        Object.keys(options.designTokens).forEach(token => {
          root.style.setProperty(`--${token}`, options.designTokens[token]);
        });
      }
    }
  }
};
