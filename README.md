# DARWIN Studio UI Library

[![Minified Gzipped Size](https://badgen.net/bundlephobia/minzip/@darwin-studio/ui-vue)](https://bundlephobia.com/result?p=@darwin-studio/ui-vue)
[![Known Vulnerabilities](https://snyk.io/test/npm/@darwin-studio/ui-vue/badge.svg)](https://snyk.io/advisor/npm-package/@darwin-studio/ui-vue)
[![Licence](https://badgen.net/github/license/d-darwin/darwin-vue-ui)](https://badgen.net/github/license/d-darwin/darwin-vue-ui)
[![Package Version](https://badgen.net/npm/v/@darwin-studio/ui-vue)](https://badgen.net/npm/v/@darwin-studio/ui-vue)

## What is it?

It's lightweight and flexible UI Library for Vue 3.

🚧 DISCLAIMER: Under construction. Not even close to alpha. So please, don't use in production.

## In short

- Components created by [Brad Frost's Atomic Design](https://atomicdesign.bradfrost.com/).
- Design tokens allow widely customize component appearance.
- Reusable logic is extracted into compositions, directives, mixins and utilities.
- Focus-visible polyfill is used to emulate :focus-visible CSS prop for a11y purpose.
- Build in reset style and google fonts support.
- Customizable components' transitions (animations).
- Icon set agnostic.

⚠️ WARNING: Components of the library have to be compiled with sass-loader, so you need sass-loader package as a dev dependency.

## Installation

```shell script
npm i @darwin-studio/ui-vue
npm i -D sass-loader sass
```

## Basic Usage

```vue
<template>
  <!--...-->
  <DTypography :content="htmlString" />
  <!-- or -->
  <DTypography>
    <h1>Hi there!</h1>
  </DTypography>
  <!--...-->
  <!--Try out our visual debug component. You'll love it!-->
  <DDebugVisual />
</template>

<script>
import { DTypography, DDebugVisual } from "@darwin-studio/ui-vue";

export default {
  //...
  components: {
    DTypography,
    DDebugVisual
  },

  data() {
    return {
      htmlString:
        "<p>Content prop may contains <b>any HTML string</b>." +
        'All <a href="/about">relative links</a> will be treated as routes if you have vue-router installed.</p>'
    };
  }
  //...
};
</script>

<style>
/* By convention root element of all components has eponymous class name. */
.d-typography {
  /* You can override css custom props to redefine design tokens on runtime. */
  --text: #222;
  --general-font-size: 16px;
  --general-line-height: 24px;
  --general-font-weight: bold;
}
</style>
```

## Documentation

Check out [the library Storybook](https://ui-vue.darwin.st/) or you can find particular component documentation in its source code.

## More details

### Components

Components are separated into atoms, molecules and organisms according to the [Brad Frost's Atomic Design](https://atomicdesign.bradfrost.com/).<br>
Additionally, containers component type introduced. Such components define appearance and functionality of their children.<br>
And finally, development components simplify development process.

#### Atoms

- **DBackdrop**. Renders a simple backdrop. Used in pair with closable components.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DButton.vue'.
- **DButton**. Renders a button of various appearance and behavior.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DButton.vue'.
- **DButtonScrollTop**. Renders button which allows scroll page to the top.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DButtonScrollTop.vue'.
- **DCheckbox**. Renders a checkbox of various appearance.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DCheckbox.vue'.
- **DCopyContent**. Allows user to copy string passed to the component in <i>content</i> prop.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DCopyContent.vue'.
- **DCopyLink**. Allows user to copy current page URL.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DCopyLink.vue'.
- **DCopyright**. Renders standard copyright string with company name and years.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DCopyright.vue'.
- **DDetails**. Renders expandable details block.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DDetails.vue'.
- **DError**. Helps unify control components error output.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DError.vue'.
- **DFiles**. Renders custom files input.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DFiles.vue'.
- **DInput**. Renders an input field of various appearance.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DInput.vue'.
- **DInputPassword**. Renders a password input field with visibility toggle.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DInputPassword.vue'.
- **DLink**. Renders a link of various appearance.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DLink.vue'.
- **DLoader**. Renders an animated svg which used in other components such as DPicture.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DLoader.vue'.
- **DNotification**. Renders text notification for a given duration.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DNotification.vue'.
- **DPicture**. Renders a picture according to Responsive Image principle.  
  Supports lazy loading, aspect-ratio prop, no image fallback and loading placeholder.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DPicture.vue'.
- **DProgressBar**. Renders custom progress bar.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DProgressBar.vue'.
- **DRadio**. Renders a radio buttons of various appearance.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DRadio.vue'.
- **DSelect**. Renders custom select of various appearance.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DSelect.vue'.
- **DSlider**. Renders a slider of various appearance.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DSlider.vue'.
- **DSwitch**. Renders a switch or a toggle of various colors.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DSwitch.vue'.
- **DTextarea**. Renders a textarea field of various appearance.  
  More details: '@dariwn-studio/ui-vue/src/components/atoms/DTextarea.vue'.
- **DVideo**. Renders a video of different formats and video hosting services.  
  Supports lazy loading, aspect-ratio prop, no image fallback and loading placeholder.  
  More details. More details: '@dariwn-studio/ui-vue/src/components/atoms/DVideo.vue'.

#### Molecules

- **DAccordion**. Renders an accordion of various appearance and behavior.  
  More details: '@dariwn-studio/ui-vue/src/components/molecules/DAccordion.vue'.
- **DCheckboxGroup**. Renders a group of checkboxes with title.  
  More details: '@dariwn-studio/ui-vue/src/components/molecules/DCheckboxGroup.vue'.
- **DRadioGroup**. Renders a group of radio buttons with title.  
  More details: '@dariwn-studio/ui-vue/src/components/molecules/DRadioGroup.vue'.
- **DTabs**. Renders customizable tabs.
  More details: '@dariwn-studio/ui-vue/src/components/molecules/DTabs.vue'.

#### Organisms

- **DDrawer**. Renders left- or right-sided closable panel.  
  More details: '@dariwn-studio/ui-vue/src/components/organisms/DDrawer.vue'.
- **DModal**. Renders widely customizable modal.  
  More details: '@dariwn-studio/ui-vue/src/components/organisms/DModal.vue'.

#### Containers

- **DAspectRatio**. Simulates aspect-ratio CSS prop to keep aspect ratio of the container content.  
  More details: '@dariwn-studio/ui-vue/src/components/containers/DAspectRatio.vue'.
- **DEqualWidth**. Forces default slot elements to be equal width.  
  More details: '@dariwn-studio/ui-vue/src/components/containers/DEqualWidth.vue'.
- **DFullScreen**. Adds full screen mode to default slot content.  
  More details: '@dariwn-studio/ui-vue/src/components/containers/DFullScreen.vue'.
- **DGrid**. Helps arrange child elements by grid.  
  More details: '@dariwn-studio/ui-vue/src/components/containers/DGrid.vue'.
- **DTooltip**. Adds tooltip to the child component.  
  More details: '@dariwn-studio/ui-vue/src/components/containers/DTooltip.vue'.
- **DTypography**. Renders an HTML strings according to defined design tokens.  
  More details: '@dariwn-studio/ui-vue/src/components/containers/DTypography.vue'.
- **DZoomIn**. The component allows zoom in slot content to cover all browser viewport.
  More details: '@dariwn-studio/ui-vue/src/components/containers/DZoomIn.vue'.

#### Development components

- **DDebugVisual**. Adds grid, elements' borders and semantic tag visualisation
  to help catch up visual and semantic errors.  
  More details: '@dariwn-studio/ui-vue/src/components/development/DDebugVisual.vue'.

#### Icon components

The library also exports default icons which used by default in some components.
You can easily replace them with your own by using appropriate component slots.
Here you can find default icons: '@dariwn-studio/ui-vue/src/components/icons'.

### Reusability and code splitting

We use composition API, directives, mixins and utils to reuse and split code.
More details you can find in appropriate directory.

- Compositions: '@dariwn-studio/ui-vue/src/compositions/'.
- Directives: '@dariwn-studio/ui-vue/src/directives/'.
- Mixins: '@dariwn-studio/ui-vue/src/mixins/'.
- Utils: '@dariwn-studio/ui-vue/src/utils/'.

### Design Tokens

Feel free to customize default appearance of the components by
redefining design tokens either in build time via SCSS variables or
in runtime via CSS custom properties. You can even import design token to your _.js or _.vue files.
To redefine customize look and feel of the components
just create css/scss file containing design tokens with you own values and import it into your application.
Alternatively you can redefine design tokens all in only place using our plugin.

```javascript
import { createApp } from "vue";
// ...
// Import plugin
import { darwinStudioUiPlugin } from "@darwin-studio/ui-vue";

createApp(App)
  .use(darwinStudioUiPlugin, {
    // Plugin options
    designTokens: {
      // use CSS custom property name without leading --.
      "color-primary": "#333",
      "transition-time-short": "200ms"
    }
  })
  .mount("#app");
```

You can find whole list of design tokens in '@dariwn-studio/ui-vue/src/assets/styles/tokens'.

### Style mixins

Some common component styles extracted into SCSS mixins and stored in separate directory.
Feel free to reuse them in your own project.  
More details you can find in '@dariwn-studio/ui-vue/src/assets/styles/mixins'.

### Vue transitions

Some common component transitions extracted into separate directory.
Feel free to reuse them in your own project.  
More details you can find in '@dariwn-studio/ui-vue/src/assets/styles/transitions'.

### Reset styles

Use the library plugin options to reset styles as follows:

```javascript
import { createApp } from "vue";
// ...
// Import plugin
import { darwinStudioUiPlugin } from "@darwin-studio/ui-vue";

createApp(App)
  .use(darwinStudioUiPlugin, {
    // Plugin options
    resetStyles: true // default is true so you don't have to specify it explicitly
  })
  .mount("#app");
```

Alternatively just add following line into your general scss file to reset all browser-specific styles.

```scss
@import "@darwin-studio/ui-vue/src/assets/styles/reset";
```

### Fonts

You can easily add any google font to your project by using the library plugin.

```javascript
import { createApp } from "vue";
// ...
// Import plugin
import { darwinStudioUiPlugin } from "@darwin-studio/ui-vue";

createApp(App)
  .use(darwinStudioUiPlugin, {
    // Plugin options
    googleFonts: [
      {
        // Specify font family name
        family: "Montserrat",
        // Specify font family properties to improve load speed
        props: "wght@100&display=swap"
      },
      {
        family: "Inter"
      }
    ],
    // Specify only chars you are going to use to improve load speed
    googleFontsText: "abcdefghijklmnopqrst",
    // Specify google font's API url if you need
    googleFontsApi: "https://fonts.googleapis.com/css"
  })
  .mount("#app");
```

Then you can use specified font families in your scss/css files as usual.

```scss
:root {
  // --font-family CSS custom property defines default font.
  --font-family: "Montserrat", sans-serif;
}

.some-class {
  font-family: "Montserrat", sans-serif;
}

.some-other-class {
  font-family: "Inter", sans-serif;
}
```

### Icons

Despite the library exposes some internal icons we don't stick with one of icon sets, you can choose one yourself.
To do so just use [@iconify/vue](https://docs.iconify.design/implementations/vue/) package or any of your choice.
