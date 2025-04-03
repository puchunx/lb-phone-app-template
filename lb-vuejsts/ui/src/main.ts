import { createApp } from "vue";
import "./colors.css";
import "./style.css";
import App from "./App.vue";

const devMode = !(window as any).invokeNative;

if (window.name === "" || devMode) {
  if (devMode) {
    createApp(App).mount("#app");
  } else {
    window.addEventListener("message", (event) => {
      if (event.data === "componentsLoaded") {
        createApp(App).mount("#app");
      }
    });
  }
}
