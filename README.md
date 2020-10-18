# DARWIN Studio UI Library

## What is it?
It's lightweight and performant UI Library for Vue 3.  
It uses CSS custom properties to define design tokens, so you can redefine them either in build time or in runtime.

🚧 DISCLAIMER: Under construction. Don't use in production until release.

## Installation
```shell script
npm i @darwin-studio/ui-vue
npm i -D sass-loader sass
```  

## Basic Usage
```vue
<template>
  <!--...-->
  <d-typography content="htmlString" />
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
      htmlString: '<p><strong>DTypography</strong> content prop may contain any HTML string.</p>'
    }
  }
  //...
}
</script>

<style>
/* By convention root element of all components has eponymous name. */
.d-typography {
  /* You can override css custom props to redefine design tokens. */
  --general-font-size: 16px;
  --general-line-height: 24px;
  --general-font-weight: bold;
}
</style>
```   
