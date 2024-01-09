import { createApp } from "vue";
import { createPinia } from "pinia";
import JwtService from "@/services/jwt/jwt.service";

import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "@/stores/auth";
import "animate.css";
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

(async () => {
  const token = JwtService.getToken();
  if (token) {
    try {
      const authStore = useAuthStore();
      await authStore.whoami();
      await router.push("/");
    } catch (e) {
      JwtService.destroyToken();
    }
  }
})();
