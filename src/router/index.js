import MainLayout from "../layouts/MainLayout.vue";

import { createRouter, createWebHistory } from "vue-router";
import About from "../page/user/About.vue";
import Contact from "../page/user/Contact.vue";
import NotFoundPage from "../components/globals/NotFoundPage.vue";
import ShoppingCart from "../page/user/ShoppingCart.vue";
import Login from "../page/auth/Login.vue";
import Register from "../page/auth/register.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../page/user/Home.vue"),
      },
      {
        path: "product",
        name: "Product",
        component: () => import("../page/user/Product.vue"),
      },
      {
        path: "product/:id",
        name: "ProductDetail",
        component: () => import("../page/user/ProductDetail.vue"),
      },
      { path: "about", name: "About", component: About },
      { path: "contact", name: "Contact", component: Contact },
      { path: "cart", name: "ShoppingCart", component: ShoppingCart },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "login", name: "Login", component: Login },
      { path: "register", name: "Registe", component: Register },
    ],
  },

  { path: "/:PathMatch(.*)*", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top on navigation
    return { top: 0 }
  },
});

// router.beforeEach((to, from, next) => {
//   const auth = useAuthStore()

//   // Check login
//   if (to.meta.requiresAuth && !auth.token) {
//     return next({ name: "Home" })
//   }

//   // Check admin
//   if (to.meta.requiresAdmin && auth.user?.role !== "admin") {
//     return next({ name: "Home" })
//   }

//   next()
// })
export default router;
