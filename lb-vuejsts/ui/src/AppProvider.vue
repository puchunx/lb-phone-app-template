<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import PhoneFrame from "./components/PhoneFrame.vue";

const devMode = !(window as any).invokeNative;

if (devMode) {
  const handleResize = () => {
    const { innerWidth, innerHeight } = window;
    const aspectRatio = innerWidth / innerHeight;
    const phoneAspectRatio = 27.6 / 59;

    if (phoneAspectRatio < aspectRatio) {
      document.documentElement.style.fontSize = "1.66vh";
    } else {
      document.documentElement.style.fontSize = "3.4vw";
    }
  };

  onMounted(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
}
</script>

<template>
  <div v-if="devMode" class="dev-wrapper">
    <PhoneFrame>
      <slot />
    </PhoneFrame>
  </div>
  <slot v-else />
</template>
