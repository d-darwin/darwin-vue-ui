# DARWIN Studio UI Library

## What is it?
It's lightweight and performant UI Library for Vue 3.  

🚧 DISCLAIMER: Under construction. Don't use in production until release.

## Key features
- Design tokens represented as SCSS variables, CSS custom properties and exported as JS variables, so you can redefine design tokens either on build time or in runtime.  
- Components created by [Brad Frost's Atomic Design](https://atomicdesign.bradfrost.com/) methodology, so you can go along with it in creating and maintaining your Design System.  
- Container components presented to define presentation of their children.  
- Developer components presented to help developers do their job.

⚠ WARNING: Components of the library have to be compiled with sass-loader, so you need sass-loader package as a dev dependency. 

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
/* By convention root element of all components has eponymous class name. */
.d-typography {
  /* You can override css custom props to redefine design tokens on runtime. */
  --general-font-size: 16px;
  --general-line-height: 24px;
  --general-font-weight: bold;
}
</style>
```   

## Documentation

For now there isn't any fancy documentation site to check out.  
All component documentation is in their source code.
In the future we are planing to use Storybook for the documentation.

## Icons

We don't want to stick with one of icon sets, so decided allow you to choose one yourself.  
To do so just use [@iconify/vue](https://docs.iconify.design/implementations/vue/) package.
