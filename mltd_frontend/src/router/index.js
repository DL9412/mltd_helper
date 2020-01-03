import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/nav"
  },
  {
    path: "/calc",
    name: "calc",
    component: () => import("../views/calc.vue")
  },
  {
    path: "/nav",
    name: "nav",
    component: () => import("../views/nav.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
