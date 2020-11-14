/** utils **/
import { createApp } from "vue";
import focusVisiblePolyfill from "focus-visible/dist/focus-visible.min.js";

/** development **/
import DGridDebug from "./components/development/DGridDebug";

/** containers **/
import DTypography from "./components/containers/DTypography";
import DGrid from "./components/containers/DGrid";

/** icons **/
import DIconChecked from "./components/icons/DIconChecked";
import DIconDirection from "./components/icons/DIconDirection";
import DIconExternalLink from "./components/icons/DIconExternalLink";
import DIconRadioChecked from "./components/icons/DIconRadioChecked";
import DIconRadioUnchecked from "./components/icons/DIconRadioUnchecked";
import DIconUnchecked from "./components/icons/DIconUnchecked";
import DIconImage from "./components/icons/DIconImage";

/** atoms **/
import DCopyright from "./components/atoms/DCopyright";
import DInput from "./components/atoms/DInput";
import DButton from "./components/atoms/DButton";
import DLink from "./components/atoms/DLink";
import DSwitch from "./components/atoms/DSwitch";
import DSelect from "./components/atoms/DSelect";
import DCheckbox from "./components/atoms/DCheckbox";
import DRadio from "./components/atoms/DRadio";
import DSlider from "./components/atoms/DSlider";
import DLoader from "./components/atoms/DLoader";
import DPicture from "./components/atoms/DPicture";

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
  DIconImage,
  /** atoms **/
  DCopyright,
  DInput,
  DButton,
  DLink,
  DSwitch,
  DSelect,
  DCheckbox,
  DRadio,
  DSlider,
  DLoader,
  DPicture
  /** molecules **/

  /** organisms **/
};
