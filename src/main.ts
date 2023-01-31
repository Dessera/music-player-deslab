import { createApp } from "vue";
import "./styles/style.css";
import App from "./App.vue";

import router from "./router";
import store from "./store";
await store.dispatch("read_config");

createApp(App)
	.use(router).use(store)
	.mount("#app");
