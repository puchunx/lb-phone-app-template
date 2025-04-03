<script setup lang="ts">
import { ref, onMounted } from "vue";

const devMode = !(window as any).invokeNative;
const direction = ref("N");

onMounted(() => {
  if (devMode) return;

  fetchNui<string>("getDirection").then((dir) => {
    direction.value = dir;
  });

  useNuiEvent("updateDirection", (dir: string) => {
    direction.value = dir;
  });
});
</script>

<template>
  <div class="header">
    <div class="title">Custom App Template</div>
    <div class="subtitle">Vue.js TS</div>
    <a class="subtitle">{{ direction }}</a>
  </div>
</template>
