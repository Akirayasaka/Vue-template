<template>
  <div class="blank-layout">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.blank-layout {
  min-height: 100vh;
  background-color: #f0f2f5;
}
</style>
