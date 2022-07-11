import { createRouter, createWebHashHistory } from "vue-router";
import AdminLogin from "../components/AdminLogin.vue";
import AdminIndex from "@/components/AdminIndex.vue";
import commentsIndex from "@/components/commentsIndex.vue";
import catIndex from "@/components/catIndex.vue";
import flowerIndex from "@/components/flowerIndex.vue";
import photoIndex from "@/components/photoIndex.vue";
import UserIndex from "@/components/UserIndex.vue";
const routes = [
  { path: "/", 
  component: AdminLogin 
  },
  { 
    path: "/index", 
    component: AdminIndex 
  },
  { 
    path: "/comments", 
    component: commentsIndex 
  },
  {
    path: "/cats",
    component: catIndex,
  },
  {
    path: "/flowers",
    component: flowerIndex,
  },
  {
    path: "/photos",
    component: photoIndex,
  },
  {
    path:'/users',
    component:UserIndex
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
