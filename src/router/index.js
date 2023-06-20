import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/views/HomePage.vue";
import UserProfile from "@/views/UserProfile.vue";
import cookies from "vue-cookies";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/profile",
    component: UserProfile,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/profile" && cookies.get(`token`) === null) {
    from;
    next("/");
  }
  next();
});
export default router;
