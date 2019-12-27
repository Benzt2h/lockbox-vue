import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LockerDeposit from "../components/LockerDeposit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/locker/:id",
    name: "lockerdeposit",
    component: LockerDeposit
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
