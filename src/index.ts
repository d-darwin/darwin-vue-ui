/** core **/
import { createApp } from "vue";
// @ts-ignore
import focusVisiblePolyfill from "focus-visible/dist/focus-visible.min.js";

/** components: atoms **/
// @ts-ignore
import DBackdrop from "./components/atoms/DBackdrop";
// @ts-ignore
import DButton from "./components/atoms/DButton";
// @ts-ignore
import DButtonScrollTop from "./components/atoms/DButtonScrollTop";
// @ts-ignore
import DCheckbox from "./components/atoms/DCheckbox";
// @ts-ignore
import DCopyContent from "./components/atoms/DCopyContent";
// @ts-ignore
import DCopyLink from "./components/atoms/DCopyLink";
// @ts-ignore
import DCopyright from "./components/atoms/DCopyright";
// @ts-ignore
import DDetails from "./components/atoms/DDetails";
// @ts-ignore
import DError from "./components/atoms/DError";
// @ts-ignore
import DFiles from "./components/atoms/DFiles";
// @ts-ignore
import DInput from "./components/atoms/DInput";
// @ts-ignore
import DInputPassword from "./components/atoms/DInputPassword";
// @ts-ignore
import DLink from "./components/atoms/DLink";
// @ts-ignore
import DLoader from "./components/atoms/DLoader";
// @ts-ignore
import DNotification from "./components/atoms/DNotification";
// @ts-ignore
import DPicture from "./components/atoms/DPicture";
// @ts-ignore
import DProgressBar from "./components/atoms/DProgressBar";
// @ts-ignore
import DRadio from "./components/atoms/DRadio";
// @ts-ignore
import DSelect from "./components/atoms/DSelect";
// @ts-ignore
import DSlider from "./components/atoms/DSlider";
// @ts-ignore
import DSwitch from "./components/atoms/DSwitch";
// @ts-ignore
import DTextarea from "./components/atoms/DTextarea";
// @ts-ignore
import DVideo from "./components/atoms/DVideo";

/** components: molecules **/
// @ts-ignore
import DAccordion from "./components/molecules/DAccordion";
// @ts-ignore
import DCheckboxGroup from "./components/molecules/DCheckboxGroup";
// @ts-ignore
import DRadioGroup from "./components/molecules/DRadioGroup";
// @ts-ignore
import DTabs from "./components/molecules/DTabs";

/** components: organisms **/
// @ts-ignore
import DModal from "./components/organisms/DModal";
// @ts-ignore
import DDrawer from "./components/organisms/DDrawer";

/** components: containers **/
// @ts-ignore
import DAspectRatio from "./components/containers/DAspectRatio";
// @ts-ignore
import DEqualWidth from "./components/containers/DEqualWidth";
// @ts-ignore
import DFullScreen from "./components/containers/DFullScreen";
// @ts-ignore
import DGrid from "./components/containers/DGrid";
// @ts-ignore
import DTooltip from "./components/containers/DTooltip";
// @ts-ignore
import DTypography from "./components/containers/DTypography";
// @ts-ignore
import DZoomIn from "./components/containers/DZoomIn";

/** components: development **/
// @ts-ignore
import DDebugVisual from "./components/development/DDebugVisual";

/** components: icons **/
// @ts-ignore
import DIconArrow from "./components/icons/DIconArrow";
// @ts-ignore
import DIconBorders from "./components/icons/DIconBorders";
// @ts-ignore
import DIconChecked from "./components/icons/DIconChecked";
// @ts-ignore
import DIconClose from "./components/icons/DIconClose";
// @ts-ignore
import DIconCloseCircle from "./components/icons/DIconCloseCircle";
// @ts-ignore
import DIconColumns from "./components/icons/DIconColumns";
// @ts-ignore
import DIconCopy from "./components/icons/DIconCopy";
// @ts-ignore
import DIconDirection from "./components/icons/DIconDirection";
// @ts-ignore
import DIconExternalLink from "./components/icons/DIconExternalLink";
// @ts-ignore
import DIconEye from "./components/icons/DIconEye";
// @ts-ignore
import DIconEyeOff from "./components/icons/DIconEyeOff";
// @ts-ignore
import DIconImage from "./components/icons/DIconImage";
// @ts-ignore
import DIconMaximize from "./components/icons/DIconMaximize";
// @ts-ignore
import DIconPaperclip from "./components/icons/DIconPaperclip";
// @ts-ignore
import DIconRadioChecked from "./components/icons/DIconRadioChecked";
// @ts-ignore
import DIconRadioUnchecked from "./components/icons/DIconRadioUnchecked";
// @ts-ignore
import DIconSemantic from "./components/icons/DIconSemantic";
// @ts-ignore
import DIconUnchecked from "./components/icons/DIconUnchecked";
// @ts-ignore
import DIconVideo from "./components/icons/DIconVideo";

/** compositions **/
// @ts-ignore
import useBlockBodyScroll from "./compositions/blockBodyScroll";
// @ts-ignore
import useClosable from "./compositions/closable";
// @ts-ignore
import useComponentId from "./compositions/componentId";
// @ts-ignore
import useCopyToClipboard from "./compositions/copyToClipboard";
// @ts-ignore
import useDownloadFile from "./compositions/downloadFile";
// @ts-ignore
import useKeyboardListener from "./compositions/keyboardListener";
// @ts-ignore
import useScrollOffset from "./compositions/scrollOffset";
// @ts-ignore
import useScrollToTop from "./compositions/scrollToTop";
// @ts-ignore
import useWindowSize from "./compositions/windowSize";

/** directives **/
// @ts-ignore
import clickOutside from "./directives/click-outside";
// @ts-ignore
import tooltip from "./directives/tooltip";

/** mixins **/
// @ts-ignore
import aspectRatioProp from "./mixins/aspectRatioProp";
// @ts-ignore
import controlColorProp from "./mixins/controlColorProp";
// @ts-ignore
import controlRoundnessProp from "./mixins/controlRoundnessProp";
// @ts-ignore
import controlSizeProp from "./mixins/controlSizeProp";
// @ts-ignore
import controlTypeProp from "./mixins/controlTypeProp";
// @ts-ignore
import hasRouter from "./mixins/hasRouter";
// @ts-ignore
import linkClickRouting from "./mixins/linkClickRouting";
// @ts-ignore
import positionFullProp from "./mixins/positionFullProp";
// @ts-ignore
import positionProp from "./mixins/positionProp";
// @ts-ignore
import typographyContentProp from "./mixins/typographyContentProp";
// @ts-ignore
import typographySizeProp from "./mixins/typographySizeProp";

/** utils **/
// @ts-ignore
import consoleWarn from "./utils/consoleWarn";
// @ts-ignore
import copyToClipboard from "./utils/copyToClipboard";
// @ts-ignore
import debounce from "./utils/debounce";
// @ts-ignore
import getAdjustedPosition from "./utils/getAdjustedPosition";
// @ts-ignore
import getHTMLElementBoxModel from "./utils/getHTMLElementBoxModel";
// @ts-ignore
import getOppositePosition from "./utils/getOppositePosition";
// @ts-ignore
import getParsedPosition from "./utils/getParsedPosition";
// @ts-ignore
import isHTMLElement from "./utils/isHTMLElement";
// @ts-ignore
import isHTMLNode from "./utils/isHTMLNode";
// @ts-ignore
import throttle from "./utils/throttle";
// @ts-ignore
import uuid from "./utils/uuid";

/** variables **/
// @ts-ignore
import controlColorList from "./variables/controlColorList";
// @ts-ignore
import controlRoundnessList from "./variables/controlRoundnessList";
// @ts-ignore
import controlSizeList from "./variables/controlSizeList";
// @ts-ignore
import controlTypeList from "./variables/controlTypeList";
// @ts-ignore
import position from "./variables/position";
// @ts-ignore
import positionFull from "./variables/positionFull";
// @ts-ignore
import typographySizeList from "./variables/typographySizeList";

/** plugin **/
// @ts-ignore
import darwinStudioUiPlugin from "./plugin/darwinStudioUi";

createApp({}).use(focusVisiblePolyfill);

/** components **/
export {
  /** atoms **/
  DBackdrop,
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
  DTabs,
  /** organisms **/
  DModal,
  DDrawer,
  /** containers **/
  DAspectRatio,
  DEqualWidth,
  DFullScreen,
  DGrid,
  DTooltip,
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
  useClosable,
  useComponentId,
  useCopyToClipboard,
  useDownloadFile,
  useKeyboardListener,
  useScrollOffset,
  useScrollToTop,
  useWindowSize
};

export const directives = {
  clickOutside,
  tooltip
};

export const mixins = {
  aspectRatioProp,
  controlColorProp,
  controlRoundnessProp,
  controlSizeProp,
  controlTypeProp,
  hasRouter,
  linkClickRouting,
  positionFullProp,
  positionProp,
  typographyContentProp,
  typographySizeProp
};

export const utils = {
  consoleWarn,
  copyToClipboard,
  getAdjustedPosition,
  getHTMLElementBoxModel,
  getOppositePosition,
  getParsedPosition,
  isHTMLElement,
  isHTMLNode,
  debounce,
  throttle,
  uuid
};

export const variables = {
  controlColorList,
  controlRoundnessList,
  controlSizeList,
  controlTypeList,
  position,
  positionFull,
  typographySizeList
};

export { darwinStudioUiPlugin };
