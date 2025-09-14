<template>
  <!-- Toast Notification -->
  <transition name="slide-fade">
    <div
      v-if="visible"
      class="fixed top-5 right-5 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2"
    >
      <!-- Icon -->
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <!-- Text -->
      <span>Success</span>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);

// Function to show toast
function showToast() {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, 3000);
}

// Example: Call showToast after adding a product to the cart
// showToast();
</script>

<style>
/* Slide & fade animation */
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.5s ease-in;
}
.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
