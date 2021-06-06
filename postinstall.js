const env = process.env;

const COLOR = is(env.npm_config_color);
const BANNER =
  "\u001B[96mThe author of @darwin-studio/ui-vue (\u001B[94m https://github.com/d-darwin \u001B[96m) is looking for a good job -)\u001B[0m\n";

showBanner();

function is(it) {
  return !!it && it !== "0" && it !== "false";
}

function showBanner() {
  console.log(COLOR ? BANNER : BANNER.replace(/\u001B\[\d+m/g, ""));
}
