<script setup>
import { ref, watch } from "vue";
import { useCartStore } from "../../stores/cart";


const props = defineProps(['quantity','id'])
const emit = defineEmits(['update:quantity'])
const quantity = ref(props.quantity);



function increseQty() {
  quantity.value++;
  
}
function decreaseQty() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

watch(() => quantity.value, (newVal) => {
  emit('update:quantity', newVal)
},
{immediate:true})

</script>
<template>
  <div class="flex justify-start items-center gap-5">
    <div class="flex items-center border rounded-lg">
      <button
        @click="decreaseQty"
        :class="{ disabled: quantity < 1 }"
        :disabled="quantity == 1"
        data-slot="button"
        class="hover:bg-secondary-color hover:text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9 h-10 w-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-minus h-4 w-4"
        >
          <path d="M5 12h14"></path>
        </svg></button
      ><span class="px-4 py-2 text-center min-w-[3rem]">{{ quantity }}</span
      ><button
        @click="increseQty"
        data-slot="button"
        class="hover:bg-secondary-color hover:text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9 h-10 w-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-plus h-4 w-4"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
      </button>
    </div>
  </div>
</template>
