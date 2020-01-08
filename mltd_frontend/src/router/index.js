import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/navtop"
  },
  {
    path: "/navtop",
    name: "navtop",
    component: () => import("../views/navtop.vue")
  },
  {
    path: "/calc",
    name: "calc",
    component: () => import("../views/calc.vue")
  },
  {
    path: "/event",
    name: "event",
    component: () => import("../views/event.vue")
  },
  {
    path: "/eventdetail/:id",
    name: "eventdetail",
    component: () => import("../views/eventdetail.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
