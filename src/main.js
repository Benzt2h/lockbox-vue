import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import * as alertify from "alertifyjs";

Vue.config.productionTip = false;
Vue.prototype.alertify = alertify;
alertify.set("notifier", "position", "top-center");

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
