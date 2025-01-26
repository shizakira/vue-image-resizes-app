<script setup lang="ts"></script>

<template>
  <div class="top-panel">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/mixins.scss";
.top-panel {
  @include box-shadow-template;
  background-color: rgb(50.8, 116.6, 184.5);
  padding: 10px;
  border-radius: 10px;
}
</style>
