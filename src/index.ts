/** utils **/
import { createApp } from "vue";
// @ts-ignore
import focusVisiblePolyfill from "focus-visible/dist/focus-visible.min.js";

/** development **/
import DGridDebug from "./components/development/DGridDebug.vue";

/** containers **/
import DTypography from "./components/containers/DTypography.vue";
import DGrid from "./components/containers/DGrid.vue";

/** icons **/
import DIconChecked from "./components/icons/DIconChecked.vue";
import DIconDirection from "./components/icons/DIconDirection.vue";
import DIconExternalLink from "./components/icons/DIconExternalLink.vue";
import DIconRadioChecked from "./components/icons/DIconRadioChecked.vue";
import DIconRadioUnchecked from "./components/icons/DIconRadioUnchecked.vue";
import DIconUnchecked from "./components/icons/DIconUnchecked.vue";

/** atoms **/
import DCopyright from "./components/atoms/DCopyright.vue";
import DInput from "./components/atoms/DInput.vue";
import DButton from "./components/atoms/DButton.vue";
import DLink from "./components/atoms/DLink.vue";
import DSwitch from "./components/atoms/DSwitch.vue";
import DSelect from "./components/atoms/DSelect.vue";
import DCheckbox from "./components/atoms/DCheckbox.vue";
import DRadio from "./components/atoms/DRadio.vue";

/** molecules **/

/** organisms **/

createApp({}).use(focusVisiblePolyfill);

export {
  /** development **/
  DGridDebug,
  /** containers **/
  DTypography,
  DGrid,
  /** icons **/
  DIconChecked,
  DIconDirection,
  DIconExternalLink,
  DIconRadioChecked,
  DIconRadioUnchecked,
  DIconUnchecked,
  /** atoms **/
  DCopyright,
  DInput,
  DButton,
  DLink,
  DSwitch,
  DSelect,
  DCheckbox,
  DRadio
  /** molecules **/

  /** organisms **/
};
