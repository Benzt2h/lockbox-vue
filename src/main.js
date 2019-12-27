import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { ValidationProvider, ValidationObserver } from "vee-validate";

Vue.config.productionTip = false;

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
