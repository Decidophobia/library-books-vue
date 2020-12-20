import Vue from "vue";
import VueRouter from "vue-router";
import Details from "../components/Details";
import Main from "../components/Main";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", name: "main", component: Main, props: true },
    { path: "/book/:id", name: "bookDetails", component: Details, props: true },
  ],
});

export default router;
