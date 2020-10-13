# DARWIN Studio UI Library

## What is it?
It's lightweight and performant UI Library for Vue 3.  

🚧 DISCLAIMER: Under construction. Don't use in production until release.

## Installation
```shell script
npm i @darwin-studio/ui-vue
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
  }
  //...
}
</script>

<style>
.d-typography {
  background: gray;
}
</style>
```   
