<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-primary-light text-center px-4">
    <!-- Big 404 -->
    <h1 class="text-9xl font-extrabold text-primary-color">404</h1>

    <!-- Message -->
    <p class="mt-4 text-2xl font-semibold text-color-text">
      Oops! The page you're looking for doesn’t exist.
    </p>
    <p class="mt-2 text-lg text-secondary-color">
      It might have been moved or deleted.
    </p>

    <!-- Button back home -->
    <router-link 
      to="/" 
      class="mt-6 px-6 py-3 rounded-2xl bg-primary-color text-body-color font-medium shadow-md hover:bg-secondary-color transition-colors"
    >
      Go Back Home
    </router-link>
  </div>
</template>

<script setup>
// No special script needed unless you want extra logic
</script>

<style scoped>
/* You already defined theme colors via @theme, so just use them with Tailwind */
.bg-primary-color {
  background-color: var(--color-primary-color);
}
.bg-primary-light {
  background-color: var(--color-primary-light);
}
.text-primary-color {
  color: var(--color-primary-color);
}
.text-secondary-color {
  color: var(--color-secondary-color);
}
.text-color-text {
  color: var(--color-color-text);
}
.text-body-color {
  color: var(--color-body-color);
}
</style>
