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
      { path: 'dashboard', name: 'Dashboard', component: ()=>import('../page/admin/dashboard.vue') },
      { path: 'users', name: 'Users', component: User },
      { path: 'orders', name: 'Orders', component: ()=>import('../page/admin/Order.vue') },
      { path: 'products', name: 'Products', component: ()=>import('../page/admin/Product.vue') },
    ],
  },



  { path: "/:PathMatch(.*)*", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = !!authStore.token
  const role = authStore.user?.role?.toLowerCase() // normalize

  // Redirect logged-in users from auth pages
  if (isLoggedIn && to.path.startsWith("/auth")) {
    if (role === "admin") return next({ path: "/admin/dashboard" })
    return next({ path: "/" })
  }


    if (to.path === "/") {
      if (isLoggedIn) {
        if (role === "admin") return next({ path: "/admin/dashboard" })
        return next() // normal user sees home
      }
      return next() // guest sees home
    }

  // Protect user routes
  const protectedPaths = ["/users/profile", "/cart"]
  if (!isLoggedIn && protectedPaths.includes(to.path)) {
    toast.warning("You must login first")
    return next({ path: "/auth/login", query: { redirect: to.fullPath } })
  }

  // Protect admin routes
  const adminPaths = ["/admin", "/admin/dashboard"]
  if (role !== "admin" && adminPaths.includes(to.path)) {
    return next({ path: "/" })
  }

  next()
})

export default router;
