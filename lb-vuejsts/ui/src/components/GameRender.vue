<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps(["remove"]);

const aspectRatio = 9 / 18;

const canvasRef = ref<HTMLCanvasElement | null>(null);
const gameRenderRef = ref<ReturnType<typeof components.createGameRender> | null>(null);

onMounted(() => {
  if (!canvasRef.value) return;

  const gameRender = components.createGameRender(canvasRef.value);
  gameRenderRef.value = gameRender;
  gameRender.resizeByAspect(aspectRatio);

  fetchNui("toggleCamera", true);

  const checkDestroyedInterval = setInterval(() => {
    if (gameRender.destroyed) props.remove;
  }, 1000);

  onUnmounted(() => {
    fetchNui("toggleCamera", false);
    clearInterval(checkDestroyedInterval);
    gameRenderRef.value?.destroy();
  });
});

const clickHandler = () => {
  gameRenderRef.value?.takePhoto().then((blob) => {
    const url = URL.createObjectURL(blob);
    props.remove(url, blob);
  });
};
</script>

<template>
  <div class="gamerender-blur" @click="remove">
    <div class="gamerender-container" :style="{ aspectRatio }" @click.stop="clickHandler">
      <canvas :style="{ width: '100%', height: '100%' }" ref="canvasRef"></canvas>
    </div>
  </div>
</template>
