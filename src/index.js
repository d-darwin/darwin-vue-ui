/** core **/
import { createApp } from "vue";
import focusVisiblePolyfill from "focus-visible/dist/focus-visible.min.js";

/** components: atoms **/
import DButton from "./components/atoms/DButton";
import DButtonScrollTop from "./components/atoms/DButtonScrollTop";
import DCheckbox from "./components/atoms/DCheckbox";
import DCopyContent from "./components/atoms/DCopyContent";
import DCopyLink from "./components/atoms/DCopyLink";
import DCopyright from "./components/atoms/DCopyright";
import DDetails from "./components/atoms/DDetails";
import DError from "./components/atoms/DError";
import DFiles from "./components/atoms/DFiles";
import DInput from "./components/atoms/DInput";
import DInputPassword from "./components/atoms/DInputPassword";
import DLink from "./components/atoms/DLink";
import DLoader from "./components/atoms/DLoader";
import DNotification from "./components/atoms/DNotification";
import DPicture from "./components/atoms/DPicture";
import DProgressBar from "./components/atoms/DProgressBar";
import DRadio from "./components/atoms/DRadio";
import DSelect from "./components/atoms/DSelect";
import DSlider from "./components/atoms/DSlider";
import DSwitch from "./components/atoms/DSwitch";
import DTextarea from "./components/atoms/DTextarea";
import DVideo from "./components/atoms/DVideo";

/** components: molecules **/
import DAccordion from "./components/molecules/DAccordion";
import DCheckboxGroup from "./components/molecules/DCheckboxGroup";
import DRadioGroup from "./components/molecules/DRadioGroup";

/** components: organisms **/
import DModal from "./components/organisms/DModal";
import DDrawer from "./components/organisms/DDrawer";

/** components: containers **/
import DAspectRatio from "./components/containers/DAspectRatio";
import DEqualWidth from "./components/containers/DEqualWidth";
import DFullScreen from "./components/containers/DFullScreen";
import DGrid from "./components/containers/DGrid";
import DTypography from "./components/containers/DTypography";
import DZoomIn from "./components/containers/DZoomIn";

/** components: development **/
import DDebugVisual from "./components/development/DDebugVisual";

/** components: icons **/
import DIconArrow from "./components/icons/DIconArrow";
import DIconBorders from "./components/icons/DIconBorders";
import DIconChecked from "./components/icons/DIconChecked";
import DIconClose from "./components/icons/DIconClose";
import DIconCloseCircle from "./components/icons/DIconCloseCircle";
import DIconColumns from "./components/icons/DIconColumns";
import DIconCopy from "./components/icons/DIconCopy";
import DIconDirection from "./components/icons/DIconDirection";
import DIconExternalLink from "./components/icons/DIconExternalLink";
import DIconEye from "./components/icons/DIconEye";
import DIconEyeOff from "./components/icons/DIconEyeOff";
import DIconImage from "./components/icons/DIconImage";
import DIconMaximize from "./components/icons/DIconMaximize";
import DIconPaperclip from "./components/icons/DIconPaperclip";
import DIconRadioChecked from "./components/icons/DIconRadioChecked";
import DIconRadioUnchecked from "./components/icons/DIconRadioUnchecked";
import DIconSemantic from "./components/icons/DIconSemantic";
import DIconUnchecked from "./components/icons/DIconUnchecked";
import DIconVideo from "./components/icons/DIconVideo";

/** compositions **/
import useBlockBodyScroll from "./compositions/blockBodyScroll";
import useClosable from "./compositions/closable";
import useDownloadFile from "./compositions/downloadFile";
import useInputId from "./compositions/inputId";
import useKeyboardListener from "./compositions/keyboardListener";
import useScrollOffset from "./compositions/scrollOffset";
import useWindowSize from "./compositions/windowSize";

/** directives **/
import clickOutside from "./directives/click-outside";

/** mixins **/
import linkClickRouting from "./mixins/linkClickRouting";

/** utils **/
import copyToClipboard from "./utils/copyToClipboard";
import debounce from "./utils/debounce";
import fontSizeProp from "./utils/fontSizeProp";
import scrollToTop from "./utils/scrollToTop";
import throttle from "./utils/throttle";
import uuid from "./utils/uuid";
import warn from "./utils/consoleWarn";

/** plugin **/
import darwinStudioUiPlugin from "./plugin/darwinStudioUi";

createApp({}).use(focusVisiblePolyfill);

/** components **/
export {
  /** atoms **/
  DButton,
  DButtonScrollTop,
  DCheckbox,
  DCopyContent,
  DCopyLink,
  DCopyright,
  DDetails,
  DError,
  DFiles,
  DInput,
  DInputPassword,
  DLink,
  DLoader,
  DNotification,
  DPicture,
  DProgressBar,
  DRadio,
  DSelect,
  DSlider,
  DSwitch,
  DTextarea,
  DVideo,
  /** molecules **/
  DAccordion,
  DCheckboxGroup,
  DRadioGroup,
  /** organisms **/
  DModal,
  DDrawer,
  /** containers **/
  DAspectRatio,
  DEqualWidth,
  DFullScreen,
  DGrid,
  DTypography,
  DZoomIn,
  /** development **/
  DDebugVisual,
  /** icons **/
  DIconArrow,
  DIconBorders,
  DIconChecked,
  DIconClose,
  DIconCloseCircle,
  DIconColumns,
  DIconCopy,
  DIconDirection,
  DIconExternalLink,
  DIconEye,
  DIconEyeOff,
  DIconImage,
  DIconMaximize,
  DIconPaperclip,
  DIconRadioChecked,
  DIconRadioUnchecked,
  DIconSemantic,
  DIconUnchecked,
  DIconVideo
};

export const compositions = {
  useBlockBodyScroll,
  useDownloadFile,
  useClosable,
  useInputId,
  useKeyboardListener,
  useScrollOffset,
  useWindowSize
};

export const directives = {
  clickOutside
};

export const mixins = {
  linkClickRouting
};

export const utils = {
  copyToClipboard,
  debounce,
  fontSizeProp,
  scrollToTop,
  throttle,
  uuid,
  warn
};

export { darwinStudioUiPlugin };
