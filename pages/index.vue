<template>
  <div class="desktop overflow-hidden">
    <LauncherGrid />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>

<style>
html {
  overflow: hidden;
}

* {
  box-sizing: border-box;
  user-select: none;
}

.desktop {
  background: url('/bg.png') no-repeat center center fixed;
  background-size: cover;
}
</style>
