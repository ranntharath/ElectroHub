<script setup>
import { useCartStore } from '../../stores/cart';

const props = defineProps([
  "id",
  "image",
  "tag",
  "category",
  "name",
  "price",
  "description",
]);

// async function handleAddToCart(event){
//   event.stopPropagation();
//   const cart = useCartStore()

//   const response = await cart.addTocart(props.id, 1)
//   console.log(props.id)
//   if(cart.addCartError){
//     alert(cart.addCartError)
//   }
//    else if(!response){
//     alert("add tocard failed")
//   }
// }
</script>
<template>
  <div
    class=" rounded-xl shadow-sm group relative transition-shadow duration-300 hover:shadow-xl"
  >
    <div class="relative rounded-t-xl overflow-hidden">
      <!-- Product Image -->
      <img
        :src="image"
        alt="Lamp"
        class="w-full h-96 md:h-70 object-contain transition-transform duration-300 group-hover:scale-105 rounded-t-xl rounded-b-0"
      />

      <div
        class="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      >
        <!-- Favorite / Heart -->
        <button
          class="bg-yellow-600 text-white p-2 rounded-md hover:bg-yellow-500 transition"
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
            class="lucide lucide-heart h-4 w-4"
          >
            <path
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            ></path>
          </svg>
        </button>

        <!-- Add to Cart -->
        <button 
          class="bg-yellow-600 text-white p-2 rounded-md hover:bg-yellow-500 transition"
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
            class="lucide lucide-shopping-cart h-4 w-4"
          >
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path
              d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Badge (optional) -->
      <span
        class="absolute top-3 left-3 bg-secondary-color text-color-text px-3 py-1 rounded-md text-sm"
      >
        {{ category }}
      </span>
    </div>

    <!-- Product Info -->
    <div class="text-start p-4">
      <h3 class="font-semibold text-color-text text-lg line-clamp-1">
        {{ name }}
      </h3>
      <h3 class="text-color-text line-clamp-1">{{ description }}</h3>
      <p class="font-bold text-primary-color">
        ${{ price }}
      </p>
    </div>
  </div>
</template>
