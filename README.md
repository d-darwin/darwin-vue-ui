## DARWIN Studio UI Library

### What is it?
It's lightweight and performant UI Library for Vue 3.  
Check [Bundlephobia](https://bundlephobia.com/result?p=@darwin-studio/ui-vue) report for proof.

🚧 DISCLAIMER: Under construction. Not even close to alpha. So please, don't use in production.

### Key features
- Design tokens represented as SCSS variables, CSS custom properties and exported as JS variables, so you can redefine design tokens either on build time or in runtime.  
- Components created by [Brad Frost's Atomic Design](https://atomicdesign.bradfrost.com/) methodology, so you can go along with it creating and maintaining your Design System.  
- Container components presented to define presentation of their children.  
- Developer components presented to help developers do their job.
- Build in optional reset style.
- Build in optional fonts.
- Icon set agnostic.
- Uses focus-visible polyfill for a11y reasons.

⚠ WARNING: Components of the library have to be compiled with sass-loader, so you need sass-loader package as a dev dependency. 

### Installation
```shell script
npm i @darwin-studio/ui-vue
npm i -D sass-loader sass
```  

### Basic Usage
```vue
<template>
  <!--...-->
  <d-typography :content="htmlString" />
  <!--...-->
</template>

<script>
import { DTypography } from "@darwin-studio/ui-vue"

export default {
  //...
  components: {
    DTypography
  },

  data() {
    return {
      htmlString: '<p>Content prop can contains <b>any HTML string.</b></p>'
    }
  }
  //...
}
</script>

<style>
/* By convention root element of all components has eponymous class name. */
.d-typography {
  /* You can override css custom props to redefine design tokens on runtime. */
  --general-font-size: 16px;
  --general-line-height: 24px;
  --general-font-weight: bold;
}
</style>
```   

### Documentation

For now there isn't any fancy documentation site to check out. 
All component documentation is in their source code. You can find components' source code in '@dariwn-studio/ui-vue/src/components'. 
In the future we are planing to use Storybook for the documentation when it will be integrated with Vue 3.

### More details  

#### Components

For now a few basic components implemented: 
* **DGrid**. Helps arrange child elements by grid. 
See more in component code: '@dariwn-studio/ui-vue/components/containers/DGrid.vue'.
* **DGridDebug**. Adds grid visualisation to help catch up arrangement errors. 
See more in component code: '@dariwn-studio/ui-vue/components/development/DGridDebug.vue'.
* **DTypography**. Renders HTML strings according to defined design tokens. 
See more in component code: '@dariwn-studio/ui-vue/components/containers/DTypography.vue'.
* **DButton**. Renders button of various appearance and behavior. 
Customisable focus-visible presented. See more in component code: '@dariwn-studio/ui-vue/components/atoms/DButton.vue'.
* **DCopyright**. Renders standard copyright string with company name and years. 
See more in component code: '@dariwn-studio/ui-vue/components/atoms/DCopyright.vue'.
* **DInput**. Renders input field of various appearance. 
Customisable focus-visible presented. See more in component code: '@dariwn-studio/ui-vue/components/atoms/DInput.vue'.
* **DLink**. Renders link of various appearance. 
Customisable focus-visible presented. See more in component code: '@dariwn-studio/ui-vue/components/atoms/DLink.vue'.
* **DSelect**. Renders select of various appearance. 
Customisable focus-visible presented. See more in component code: '@dariwn-studio/ui-vue/components/atoms/DSelect.vue'.
* **DSwitch**. Renders switch or toggle of various colors. 
Customisable focus-visible presented. See more in component code: '@dariwn-studio/ui-vue/components/atoms/DSwitch.vue'.

#### Design Tokens  

Feel free to customize default appearance of the components by 
redefining design tokens either in build time via SCSS variables or 
in runtime via CSS custom properties. 
You can even import design token to your *.js files. 
Check out what you can redefine in '@dariwn-studio/ui-vue/src/assets/styles/tokens'.

#### Reset styles  

Just add following line into your general scss file to reset all browser-specific styles.
```scss
@import "@darwin-studio/ui-vue/src/assets/styles/reset";
```

#### Fonts  

You can easily add to your project one of the popular open source custom font by adding following line. 
```scss
@import "@darwin-studio/ui-vue/src/assets/styles/fonts/[font-family-name]";
```
List of supported [font-family-names]:  
- inter;
- fira-sans;
- manrope;
- oswald;
- spectral;
- source-sans;
- montserrat;
- noto-sans;
- anonymous-pro;
- roboto.

#### Icons  

We don't want to stick with one of icon sets, so decided allow you to choose one yourself.  
To do so just use [@iconify/vue](https://docs.iconify.design/implementations/vue/) package or any you prefer.

