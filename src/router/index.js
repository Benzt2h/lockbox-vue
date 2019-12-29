import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import LockerDeposit from "../components/LockerDeposit.vue";
import LockerWithdraw from "../components/LockerWithdraw.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/locker/:id",
    name: "lockerdeposit",
    component: LockerDeposit
  },
  {
    path: "/lockerwitdraw/:id",
    name: "lockerwithdraw",
    component: LockerWithdraw
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = "LockBox with Vue.js";
  next();
});

export default router;
