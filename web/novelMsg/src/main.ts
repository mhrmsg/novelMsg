import { createApp } from "vue";
import "tailwindcss/tailwind.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
const pinia = createPinia();
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
