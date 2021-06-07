/** core **/
import { createApp } from "vue";
import focusVisiblePolyfill from "focus-visible/dist/focus-visible.min.js";

/** components: atoms **/
import DBackdrop from "./components/atoms/DBackdrop";
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
import DTabs from "./components/molecules/DTabs";

/** components: organisms **/
import DModal from "./components/organisms/DModal";
import DDrawer from "./components/organisms/DDrawer";

/** components: containers **/
import DAspectRatio from "./components/containers/DAspectRatio";
import DEqualWidth from "./components/containers/DEqualWidth";
import DFullScreen from "./components/containers/DFullScreen";
import DGrid from "./components/containers/DGrid";
import DTooltip from "./components/containers/DTooltip";
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
import useComponentId from "./compositions/componentId";
import useCopyToClipboard from "./compositions/copyToClipboard";
import useDownloadFile from "./compositions/downloadFile";
import useKeyboardListener from "./compositions/keyboardListener";
import useScrollOffset from "./compositions/scrollOffset";
import useScrollToTop from "./compositions/scrollToTop";
import useWindowSize from "./compositions/windowSize";

/** directives **/
import clickOutside from "./directives/click-outside";
import tooltip from "./directives/tooltip";

/** mixins **/
import aspectRatioProp from "./mixins/aspectRatioProp";
import controlColorProp from "./mixins/controlColorProp";
import controlRoundnessProp from "./mixins/controlRoundnessProp";
import controlSizeProp from "./mixins/controlSizeProp";
import controlTypeProp from "./mixins/controlTypeProp";
import hasRouter from "./mixins/hasRouter";
import linkClickRouting from "./mixins/linkClickRouting";
import positionFullProp from "./mixins/positionFullProp";
import positionProp from "./mixins/positionProp";
import typographyContentProp from "./mixins/typographyContentProp";
import typographySizeProp from "./mixins/typographySizeProp";

/** utils **/
import consoleWarn from "./utils/consoleWarn";
import copyToClipboard from "./utils/copyToClipboard";
import debounce from "./utils/debounce";
import getAdjustedPosition from "./utils/getAdjustedPosition";
import getHTMLElementBoxModel from "./utils/getHTMLElementBoxModel";
import getOppositePosition from "./utils/getOppositePosition";
import getParsedPosition from "./utils/getParsedPosition";
import isHTMLElement from "./utils/isHTMLElement";
import isHTMLNode from "./utils/isHTMLNode";
import throttle from "./utils/throttle";

/** variables **/
import controlColorList from "./variables/controlColorList";
import controlRoundnessList from "./variables/controlRoundnessList";
import controlSizeList from "./variables/controlSizeList";
import controlTypeList from "./variables/controlTypeList";
import position from "./variables/position";
import positionFull from "./variables/positionFull";
import typographySizeList from "./variables/typographySizeList";

/** plugin **/
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
  throttle
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
