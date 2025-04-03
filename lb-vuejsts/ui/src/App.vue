<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import AppProvider from "./AppProvider.vue";
import Header from "./components/Header.vue";
import GameRender from "./components/GameRender.vue";

const devMode = !(window as any).invokeNative;

const gameRender = ref(false);
const notificationText = ref("Notification text");

onMounted(() => {
  if (devMode) {
    document.body.style.visibility = "visible";
  }
});

watch(notificationText, (newValue) => {
  if (newValue === "") {
    notificationText.value = "Notification text";
  }
});

const showPopupMenu = () => {
  components.setPopUp({
    title: "Popup Menu",
    description: "Confirm your choice",
    buttons: [
      {
        title: "Cancel",
        color: "red",
        cb: () => console.log("Cancel"),
      },
      {
        title: "Confirm",
        color: "blue",
        cb: () => console.log("Confirm"),
      },
    ],
  });
};

const showContextMenu = () => {
  components.setContextMenu({
    title: "Context menu",
    buttons: [
      {
        title: "Phone Notification",
        color: "blue",
        cb: () => sendNotification({ title: notificationText.value }),
      },
      {
        title: "GTA Notification",
        color: "red",
        cb: () => fetchNui("drawNotification", { message: notificationText.value }),
      },
    ],
  });
};

const selectGIFHandler = () => {
  components.setGifPickerVisible({
    onSelect(gif) {
      components.setPopUp({
        title: "Selected GIF",
        attachment: { src: gif },
        buttons: [
          {
            title: "OK",
          },
        ],
      });
    },
  });
};

const selectGalleryHandler = () => {
  components.setGallery({
    includeVideos: true,
    includeImages: true,
    allowExternal: true,
    multiSelect: false,

    onSelect(data) {
      components.setPopUp({
        title: "Selected media",
        attachment: { src: Array.isArray(data) ? data[0].src : data.src },
        buttons: [
          {
            title: "OK",
          },
        ],
      });
    },
  });
};

const selectEmojiHandler = () => {
  components.setEmojiPickerVisible({
    onSelect: (emoji) => {
      components.setEmojiPickerVisible(false);
      components.setPopUp({
        title: "Selected emoji",
        description: emoji?.emoji,
        buttons: [
          {
            title: "OK",
          },
        ],
      });
    },
  });
};

const colorPickerHandler = () => {
  components.setColorPicker({
    onSelect(_color) {},
    onClose(color) {
      components.setPopUp({
        title: "Selected color",
        description: color,
        buttons: [
          {
            title: "OK",
          },
        ],
      });
    },
  });
};

const useCameraHandler = () => {
  useCamera(
    (url) => {
      components.setPopUp({
        title: "Media taken",
        attachment: { src: url },
        buttons: [{ title: "OK" }],
      });
    },
    {
      default: {
        type: "Photo", // 'Photo' | 'Video' | 'Landscape'
        flash: false,
        camera: "rear", // 'rear' | 'front'
      },
      permissions: {
        toggleFlash: true,
        flipCamera: true,
        takePhoto: true,
        takeVideo: true,
        takeLandscapePhoto: true,
      },
    }
  );
};

const remove = (url: string, blob: Blob) => {
  gameRender.value = false;

  if (url) {
    components.setPopUp({
      title: "Photo taken",
      attachment: { src: url },
      buttons: [
        {
          title: "Close",
          color: "red",
        },
        {
          title: "Save",
          color: "blue",
          cb: async () => {
            const url = await components.uploadMedia("Image", blob);

            if (!url) return;

            components.saveToGallery(url);
          },
        },
      ],
    });
  }
};
</script>

<template>
  <div>
    <AppProvider :devMode="devMode">
      <div class="app-wrapper">
        <Header></Header>
        <div class="button-wrapper">
          <button @click="showPopupMenu">Popup Menu</button>
          <button @click="showContextMenu">Context menu</button>
          <button @click="selectGIFHandler">Gif Selector</button>
          <button @click="selectGalleryHandler">Gallery Selector</button>
          <button @click="selectEmojiHandler">Emoji Selector</button>
          <button @click="colorPickerHandler">Color Picker</button>
          <button @click="useCameraHandler">Camera Component</button>
          <button @click="gameRender = !gameRender"></button>
          <GameRender v-if="gameRender" :remove="remove"></GameRender>
          <input placeholder="Notification text" v-model="notificationText" />
        </div>
      </div>
    </AppProvider>
  </div>
</template>
