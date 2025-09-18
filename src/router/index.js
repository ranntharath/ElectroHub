import MainLayout from "../layouts/MainLayout.vue";

import { createRouter, createWebHistory } from "vue-router";
import About from "../page/user/About.vue";
import Contact from "../page/user/Contact.vue";
import NotFoundPage from "../components/globals/NotFoundPage.vue";
import ShoppingCart from "../page/user/ShoppingCart.vue";
import Login from "../page/auth/Login.vue";
import Register from "../page/auth/register.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import { useAuthStore } from "../stores/auth";
import { useToast } from "vue-toastification";
import AdminLayout from "../layouts/AdminLayout.vue";
import User from "../page/admin/User.vue";
import Order from "../page/admin/Order.vue";
import Dashboard from "../page/admin/dashboard.vue";

const toast = useToast()
const routes = [
    {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "login", name: "Login", component: Login },
      { path: "register", name: "Registe", component: Register },
    ],
  },
  {path:"/users/profile", name:"UserProfile", component: ()=>import('../page/user/Profile.vue')},
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
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
      { path: 'users', name: 'Users', component: User },
      { path: 'orders', name: 'Orders', component: Order }
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.token  // or however your store tracks login

  // If user is logged in and tries to access auth pages
  if (isLoggedIn && to.path.startsWith("/auth")) {
    return next({ path: "/" }) // redirect to home
  }

  // If user is not logged in and tries to access protected routes
  const protectedPaths = ["/users/profile", "/cart"] 
  if (!isLoggedIn && protectedPaths.includes(to.path)) {
   toast.warning("You must login first")
  if (from.path === "/") return next({ path: "/" }) // no previous route
  return next(false)
  }
  next()
})
export default router;
