<script setup>
import {  onMounted, ref, watchEffect } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useCartStore } from "../../stores/cart";
const menus = [
    { path: "/", label: "Home" },
    { path: "/product", label: "Product" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },

];
const cartStore = useCartStore();
const isMobile = ref(false);
const auth = useAuthStore()
function isMobileToggle() {
    isMobile.value = !isMobile.value;
}
onMounted(async()=>{
    if(cartStore.cartCound == 0){
        await cartStore.getCart()
    }
})

</script>
<template>
    <nav class="sticky top-0 z-50 bg-white/20 backdrop-blur-md shadow-md">
        <div class="flex justify-between items-center py-2 md:py-4 px-4 sm:px-10 md:px-16 lg:px-[120px]">
            <router-link to="/">
                <h1 class="text-2xl font-bold text-primary-color">ElectroHub</h1>
            </router-link>
            <ul class="hidden md:flex justify-center items-center gap-5 text-color-text">
                <li @click="isMobile = false" class="hover:text-primary-color cursor-pointer font-semibold " v-for="menu in menus">
                    <router-link :to="menu.path">{{ menu.label }}</router-link>
                </li>
            </ul>
            <div class="flex justify-center items-center gap-3">
                <router-link v-if="auth.token" to="/">
                    <div
                        class="p-2 rounded-md hover:bg-secondary-color hover:text-white transition-all ease-in-out duration-100">
                       <img class="w-7 h-7 overflow-hidden rounded-full" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="">
                        
                    </div>
                </router-link>
                
                <router-link to="/cart">
                    <div
                        class="p-2 rounded-md  hover:text-secondary-color transition-all ease-in-out duration-100 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-shopping-cart h-5 w-5 ">
                            <circle cx="8" cy="21" r="1"></circle>
                            <circle cx="19" cy="21" r="1"></circle>
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12">
                            </path>
                        </svg>
                        <p class="absolute top-0 right-0 bg-red-600  flex justify-center items-center text-white w-4  h-4 text-sm rounded-full">{{ cartStore.cartCound }}</p>
                    </div>
                </router-link>
                <router-link to="/auth/login">
                    <button v-if="!auth.token"
                        class="w-full bg-primary-color hover:bg-primary-color/90 text-white px-5 py-2 rounded-md">
                        Login
                    </button>
                </router-link>


                <p v-if="!isMobile" @click="isMobileToggle" class="cursor-pointer block md:hidden">
                    <i class="fa-solid fa-bars"></i>
                </p>
                <p v-if="isMobile" @click="isMobileToggle" class="cursor-pointer block md:hidden">
                    <i class="fa-solid fa-xmark"></i>
                </p>
            </div>
        </div>
        <!-- mobile nav -->
        <div>
            <!-- mobile nav -->
            <ul class="flex flex-col md:hidden justify-center items-center gap-5 overflow-hidden transition-all ease-in-out duration-300 "
                :class="{ 'max-h-96': isMobile, 'max-h-0': !isMobile }, { 'pb-4': isMobile }">
                <li @click="isMobile = false" class="hover:text-primary-color cursor-pointer" v-for="menu in menus">
                    <router-link :to="menu.path">{{ menu.label }}</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
