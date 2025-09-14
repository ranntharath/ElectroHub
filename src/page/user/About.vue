<template>
  <div class="   from-primary-light to-hiro  flex items-start justify-center px-4 py-20">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Logo -->
      <div class="mb-8">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg border border-gray-200 mb-6">
          <svg class="w-12 h-12 text-primary-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-primary-color ">ElectroHub</h1>
      </div>

      <!-- Coming Soon -->
      <h2 class="text-5xl md:text-6xl lg:text-7xl font-black text-secondary-color mb-8">
        Coming Soon
      </h2>

      <!-- Subtitle -->
      <p class="text-xl md:text-2xl text-text-custom mb-6">
        Something amazing is in the works!
      </p>

      <!-- Description -->
      <p class="text-lg text-text-custom max-w-3xl mx-auto leading-relaxed">
        We're crafting an incredible shopping experience just for you. Stay tuned for the best deals, premium products, and exceptional service.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComingSoonSimple'
}
</script>

<style scoped>


.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--color-primary-light), var(--color-hiro-color));
}
</style>