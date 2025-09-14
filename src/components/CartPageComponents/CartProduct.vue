<script setup lang="ts">
import { ref, watch } from "vue";
import { useCartStore } from "../../stores/cart";

const props = defineProps({
  id: String,
  image: String,
  price: Number,
  name: String,
  description: String,
  qty: {
    type: Number,
    default: 1,
  },
  productId: String,
});
const emit = defineEmits(["update:removeCart"]);

const cartStore = useCartStore();
const quantity = ref(props.qty);


function increseQty() {
  quantity.value++;
}
function decreaseQty() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

watch(
  () => quantity.value,
  (newVal) => {
    console.log(quantity.value, props.productId, newVal);
    cartStore.updateQty(props.productId, newVal);
  }
);
</script>

<template>
  <div
    class="flex flex-col md:flex-row justify-between items-center bg-primary-light rounded-md p-3 gap-3 hover:shadow-md transition-shadow duration-150 ease-in-out border shadow border-slate-200"
  >
    <div class="flex justify-between items-center gap-5 w-full md:w-fit">
      <img class="h-32 object-contain rounded-md" :src="image" alt="product" />
      <div>
        <p>{{ name }}</p>
        <p>
          <span class="text-primary-color text-xl">${{ price }}</span>
          <span class="text-sm line-through">$119.99</span>
        </p>
      </div>
    </div>

    <div
      class="flex flex-row md:flex-col justify-start md:justify-start items-center md:items-end gap-3 w-full"
    >
      <div class="flex justify-start items-center gap-5">
        <div class="flex items-center border rounded-lg">
          <button
            @click="decreaseQty"
            :class="{ disabled: quantity < 1 }"
            :disabled="quantity == 1"
            data-slot="button"
            class="hover:bg-secondary-color hover:text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9 h-8 w-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-minus h-3 w-3"
            >
              <path d="M5 12h14"></path>
            </svg></button
          ><span class="px-4 text-center min-w-[3rem]">{{ quantity }}</span
          ><button
            @click="increseQty"
            data-slot="button"
            class="hover:bg-secondary-color hover:text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9 h-8 w-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-plus h-3 w-3"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex flex-row md:flex-col justify-center items-center gap-1">
        <p class="text-primary-color">${{ quantity * price }}</p>
        <!-- <p class="line-through text-sm">$239.98</p> -->
      </div>

      <!-- Remove button added here -->
      <button
        @click="removeFromCart"
        class="text-red-600 hover:underline underline-offset-3 hover:scale-[1.02] cursor-pointer"
      >
        X Remove
      </button>
    </div>
  </div>
</template>
