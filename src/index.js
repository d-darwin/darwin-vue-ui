/** utils **/
import { createApp } from "vue";
import focusVisiblePolyfill from "focus-visible/dist/focus-visible.min.js";

/** development **/
import DGridDebug from "./components/development/DGridDebug";

/** containers **/
import DTypography from "./components/containers/DTypography";
import DGrid from "./components/containers/DGrid";

/** icons **/
import DIconExternalLink from "./components/icons/DIconExternalLink";

/** atoms **/
import DCopyright from "./components/atoms/DCopyright";
import DInput from "./components/atoms/DInput";
import DButton from "./components/atoms/DButton";
import DLink from "./components/atoms/DLink";

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
  DIconExternalLink,
  /** atoms **/
  DCopyright,
  DInput,
  DButton,
  DLink
  /** molecules **/

  /** organisms **/
};
