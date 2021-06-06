module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!src/*.js",
    "!src/*.vue",
    "!/node_modules/"
  ],
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transform: {
    "^.+\\.vue$": "vue-jest"
  }
};
