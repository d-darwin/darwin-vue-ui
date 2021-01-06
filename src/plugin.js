import warn from "./utils/warn";

const defaultOptions = {
  stylesReset: true,
  fontFamily: null
};

export const darwinStudioUi = {
  install: async (app, options) => {
    // merge user options with the defaults ones
    options = Object.assign(defaultOptions, options);

    if (options.stylesReset) {
      await import("./assets/styles/_reset.scss");
    }

    if (options.fontFamily) {
      try {
        // TODO: how to config font string (:ital,wght@0,400;0,700;1,400;1,700&display=swap) ???
        await import(`./assets/styles/fonts/_${options.fontFamily}.scss`);
      } catch {
        warn(
          `Can't find font "${options.fontFamily}".
          Double check docs if it supports by the library.`
        );
      }
    }
  }
};
