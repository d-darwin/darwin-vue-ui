/** utils **/
import { createApp } from "vue";
import focusVisiblePolyfill from "focus-visible/dist/focus-visible.min.js";

/** development **/
import DGridDebug from "./components/development/DGridDebug";

/** containers **/
import DTypography from "./components/containers/DTypography";
import DGrid from "./components/containers/DGrid";
import DAspectRatioBox from "./components/containers/DAspectRatioBox";

/** icons **/
import DIconChecked from "./components/icons/DIconChecked";
import DIconDirection from "./components/icons/DIconDirection";
import DIconExternalLink from "./components/icons/DIconExternalLink";
import DIconRadioChecked from "./components/icons/DIconRadioChecked";
import DIconRadioUnchecked from "./components/icons/DIconRadioUnchecked";
import DIconUnchecked from "./components/icons/DIconUnchecked";
import DIconImage from "./components/icons/DIconImage";
import DIconVideo from "./components/icons/DIconVideo";
import DIconColumns from "./components/icons/DIconColumns";
import DIconPaperclip from "./components/icons/DIconPaperclip";
import DIconCloseCircle from "./components/icons/DIconCloseCircle";

/** atoms **/
import DButton from "./components/atoms/DButton";
import DCheckbox from "./components/atoms/DCheckbox";
import DCopyright from "./components/atoms/DCopyright";
import DInput from "./components/atoms/DInput";
import DLink from "./components/atoms/DLink";
import DSwitch from "./components/atoms/DSwitch";
import DSelect from "./components/atoms/DSelect";
import DRadio from "./components/atoms/DRadio";
import DSlider from "./components/atoms/DSlider";
import DLoader from "./components/atoms/DLoader";
import DPicture from "./components/atoms/DPicture";
import DVideo from "./components/atoms/DVideo";
import DError from "./components/atoms/DError";
import DFiles from "./components/atoms/DFiles";

/** molecules **/
import DCheckboxGroup from "./components/molecules/DCheckboxGroup";

/** organisms **/

createApp({}).use(focusVisiblePolyfill);

export {
  /** development **/
  DGridDebug,
  /** containers **/
  DTypography,
  DGrid,
  DAspectRatioBox,
  /** icons **/
  DIconChecked,
  DIconDirection,
  DIconExternalLink,
  DIconRadioChecked,
  DIconRadioUnchecked,
  DIconUnchecked,
  DIconImage,
  DIconVideo,
  DIconColumns,
  DIconPaperclip,
  DIconCloseCircle,
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
  DPicture,
  DVideo,
  DError,
  DFiles,
  /** molecules **/
  DCheckboxGroup
  /** organisms **/
};
