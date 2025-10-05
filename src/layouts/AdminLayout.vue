<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import ComfirmDialog from "../components/globals/ComfirmDialog.vue";
const isOpen = ref(false);
const router = useRouter()

const showLogout = ref(false)
const isMd = ref(false); // will change on resize

onMounted(() => {
  const mql = window.matchMedia("(min-width: 768px)"); // Tailwind md

  // set initial value
  isMd.value = mql.matches;

  // listener for changes
  const handler = (e) => {
    isMd.value = e.matches; // true if >=768px, false otherwise
  };

  // start listening
  mql.addEventListener("change", handler);

  // clean up on unmount
  onBeforeMount(() => {
    mql.removeEventListener("change", handler);
  });
});
watch(isMd, (newVal) => {
  if (!newVal) {
    isOpen.value = false;
  }
});
function logout(){
  const authStore = useAuthStore()
  authStore.logout()
  router.push("/")
}

</script>
<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      class="bg-white fixed lg:static max-w-0 lg:max-w-96 transition-all duration-200 ease-in-out shadow-md overflow-hidden"
      :class="isOpen ? 'max-w-96' : 'max-w-0'">
      <div class="p-4 text-xl font-bold admin text-white text-center">
        Admin
      </div>
      <nav class="space-y-2 p-4 w-64">
        <RouterLink @click="isOpen = false" to="/admin/dashboard" class="flex px-4 py-2 hover:bg-gray-200"><svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-layout-dashboard-icon lucide-layout-dashboard w-5 h-5 mr-3">
            <rect width="7" height="9" x="3" y="3" rx="1"></rect>
            <rect width="7" height="5" x="14" y="3" rx="1"></rect>
            <rect width="7" height="9" x="14" y="12" rx="1"></rect>
            <rect width="7" height="5" x="3" y="16" rx="1"></rect>
          </svg>
          <p>Dashboard</p>
        </RouterLink>
        <RouterLink @click="isOpen = false" to="/admin/products" class="flex px-4 py-2 hover:bg-gray-200"><svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-layout-dashboard-icon lucide-layout-dashboard w-5 h-5 mr-3">
            <rect width="7" height="9" x="3" y="3" rx="1"></rect>
            <rect width="7" height="5" x="14" y="3" rx="1"></rect>
            <rect width="7" height="9" x="14" y="12" rx="1"></rect>
            <rect width="7" height="5" x="3" y="16" rx="1"></rect>
          </svg>
          <p>Products</p>
        </RouterLink>
        <RouterLink @click="isOpen = false" to="/admin/users" class="flex px-4 py-2 hover:bg-gray-200"><svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-users-icon lucide-users w-5 h-5 mr-3">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <circle cx="9" cy="7" r="4"></circle>
          </svg>
          <p>Uesrs</p>
        </RouterLink>
        <RouterLink @click="isOpen = false" to="/admin/orders" class="flex px-4 py-2 hover:bg-gray-200"><svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-shopping-cart-icon lucide-shopping-cart w-5 h-5 mr-3">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
          <p>Orders</p>
        </RouterLink>
        <button @click="showLogout=true" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 w-full"> 
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" aria-hidden="false"
            role="img" focusable="false">
            <title>Logout</title>
            <path fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
              d="M16 17l5-5-5-5" />
            <path fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
              d="M21 12H9" />
          </svg>

          <p>Log out</p>
        </button>
      </nav>
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col">
      <!-- Topbar -->
      <header class="bg-white shadow p-4 flex gap-3 justify-start items-center">
        <button @click="isOpen = !isOpen" class="lg:hidden flex justify-center items-center">
          <i class="fa-solid fa-bars text-xl"></i>
        </button>
        <h1 class="text-lg font-semibold">Admin Panel</h1>
      </header>

      <main class="p-6">
        <RouterView />
      </main>
    </div>
  </div>
<ComfirmDialog :show="showLogout"  title="Log out" message="Are you sure you want to log out?" @cancel="showLogout=false" @confirm="logout"/>
</template>
<style>
/* .router-link-exact-active{
    color: #0b6902 ;
    background-color: #4c9046;
    border-radius: 10px;
} */
.admin {
  background-color: #0b6902;
}
</style>
