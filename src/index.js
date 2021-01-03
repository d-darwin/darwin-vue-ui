/** core **/
import { createApp } from "vue";
import focusVisiblePolyfill from "focus-visible/dist/focus-visible.min.js";

/** components: atoms **/
import DButton from "./components/atoms/DButton";
import DCheckbox from "./components/atoms/DCheckbox";
import DCopyright from "./components/atoms/DCopyright";
import DError from "./components/atoms/DError";
import DFiles from "./components/atoms/DFiles";
import DInput from "./components/atoms/DInput";
import DLink from "./components/atoms/DLink";
import DLoader from "./components/atoms/DLoader";
import DNotification from "./components/atoms/DNotification";
import DPicture from "./components/atoms/DPicture";
import DRadio from "./components/atoms/DRadio";
import DSelect from "./components/atoms/DSelect";
import DSlider from "./components/atoms/DSlider";
import DSwitch from "./components/atoms/DSwitch";
import DVideo from "./components/atoms/DVideo";

/** components: molecules **/
import DCheckboxGroup from "./components/molecules/DCheckboxGroup";
import DRadioGroup from "./components/molecules/DRadioGroup";

/** components: organisms **/

/** components: containers **/
import DAspectRatio from "./components/containers/DAspectRatio";
import DEqualWidth from "./components/containers/DEqualWidth";
import DFullScreen from "./components/containers/DFullScreen";
import DGrid from "./components/containers/DGrid";
import DTypography from "./components/containers/DTypography";
import DZoomIn from "./components/containers/DZoomIn";

/** components: icons **/
import DIconChecked from "./components/icons/DIconChecked";
import DIconClose from "./components/icons/DIconClose";
import DIconCloseCircle from "./components/icons/DIconCloseCircle";
import DIconColumns from "./components/icons/DIconColumns";
import DIconDirection from "./components/icons/DIconDirection";
import DIconExternalLink from "./components/icons/DIconExternalLink";
import DIconImage from "./components/icons/DIconImage";
import DIconMaximize from "./components/icons/DIconMaximize";
import DIconPaperclip from "./components/icons/DIconPaperclip";
import DIconRadioChecked from "./components/icons/DIconRadioChecked";
import DIconRadioUnchecked from "./components/icons/DIconRadioUnchecked";
import DIconUnchecked from "./components/icons/DIconUnchecked";
import DIconVideo from "./components/icons/DIconVideo";

/** components: development **/
import DGridDebug from "./components/development/DGridDebug";

/** compositions **/
import useInputId from "./compositions/inputId";
import useWindowSize from "./compositions/windowSize";

/** mixins **/
import linkClickRouting from "./mixins/linkClickRouting";

/** utils **/
import copyToClipboard from "./utils/copyToClipboard";
import debounce from "./utils/debounce";
import fontSizeProp from "./utils/fontSizeProp";
import throttle from "./utils/throttle";
import uuid from "./utils/uuid";

createApp({}).use(focusVisiblePolyfill);

/** components **/
export {
  /** atoms **/
  DButton,
  DCheckbox,
  DCopyright,
  DError,
  DFiles,
  DInput,
  DLink,
  DLoader,
  DNotification,
  DPicture,
  DRadio,
  DSelect,
  DSlider,
  DSwitch,
  DVideo,
  /** molecules **/
  DCheckboxGroup,
  DRadioGroup,
  /** organisms **/
  /** containers **/
  DAspectRatio,
  DEqualWidth,
  DFullScreen,
  DGrid,
  DTypography,
  DZoomIn,
  /** icons **/
  DIconChecked,
  DIconClose,
  DIconCloseCircle,
  DIconColumns,
  DIconDirection,
  DIconExternalLink,
  DIconImage,
  DIconMaximize,
  DIconPaperclip,
  DIconRadioChecked,
  DIconRadioUnchecked,
  DIconUnchecked,
  DIconVideo,
  /** development **/
  DGridDebug
};

export const compositions = {
  useInputId,
  useWindowSize
};

export const mixins = {
  linkClickRouting
};

export const utils = {
  copyToClipboard,
  debounce,
  fontSizeProp,
  throttle,
  uuid
};
