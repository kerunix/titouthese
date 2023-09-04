<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <ClientOnly>
    <Scene />
  </ClientOnly>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#__nuxt {
  height: 100%;
  width: 100%;
}
</style>