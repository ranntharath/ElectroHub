<script setup>
defineProps({
  show: Boolean,
  title: String,
  message: String
})

</script>



<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
    <!-- background overlay -->
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" @click="$emit('cancel')"></div>

    <!-- dialog -->
    <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-[fadeIn_0.2s_ease-out]">
      <!-- icon + title -->
      <div class="flex items-center gap-3 mb-4">
        <div class="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01M12 17h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900">{{ title }}</h2>
      </div>

      <!-- message -->
      <p class="text-gray-600 mb-6">
        {{ message }}
      </p>

      <!-- actions -->
      <div class="flex justify-end gap-3">
        <button @click="$emit('cancel')"
          class="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
          Cancel
        </button>
        <button @click="$emit('confirm')"
          class="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition">
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
</template>
