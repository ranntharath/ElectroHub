<script setup>
import { useRoute } from "vue-router";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import ProductCard from "../../components/ProductPageComponents/ProductCard.vue";
import QuantityBtn from "../../components/globals/QuantityBtn.vue";
import { useProductStore } from "../../stores/product";
import { useCartStore } from "../../stores/cart";
import { useToast } from "vue-toastification";

const props = defineProps(
  ['id','image','tag', 'category', 'name','price','description']
);

const toast = useToast()

const route = useRoute();
const prodctStore = useProductStore()
const oneProduct = ref({})

const activeImage = ref(null);
const quantity = ref(1);
onMounted(()=>{
  if (!prodctStore.response?.products?.length) {
    prodctStore.getAllProduct();
  }
})
watch(
  () => route.params.id,
  async(newId) => {
    if(!newId) return
    oneProduct.value = await prodctStore.getProductById(newId)
    activeImage.value = oneProduct.value?.product?.images[0] || null;
    quantity.value = 1
  },
  {
    immediate: true,
  }
);
async function handleAddToCart(){
  const cart = useCartStore()
   
  const response = await cart.addTocart(oneProduct.value?.product?._id, quantity.value)
   if (cart.addCartError) {
    toast.error(cart.addCartError, { timeout: 2000 })
  } else if (!response) {
    toast.warning("Add to cart failed", { timeout: 2000 })
  } else {
    toast.success("Added to cart successfully", { timeout: 2000 })
  }
}
const related = computed(() => {
  if (!prodctStore.response?.products || !oneProduct.value?.product?.category) return [];
  return prodctStore.response.products.filter(
    (e) => e.category === oneProduct.value.product?.category && e._id != oneProduct.value?.product._id 
  );
});


</script>
<template>


  <div v-if="!prodctStore.isGetProductById" class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Product Gallery -->
        <div>
          <div class="bg-white rounded-2xl shadow-sm p-4">
            <img
              :src="activeImage"
              alt="Product"
              class="w-full aspect-square object-contain rounded-x"
            />
          </div>
          <div class="mt-4 grid grid-cols-4 gap-3">
            <button
              v-for="(img, i) in oneProduct.product?.images"
              :key="i"
              @click="activeImage = img"
              class="group"
            >
              <img
                :src="img"
                class="h-20 w-full object-contain rounded-xl border transition group-hover:shadow"
                :class="
                  activeImage === img
                    ? 'ring-2 ring-primary-color'
                    : 'border-secondary-color'
                "
              />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6 text-color-text">
          <div>
            <!-- <span
              class="inline-flex items-center rounded-md px-3 py-1 text-xs font-medium bg-secondary-color text-white"
            >
              {{ oneProduct.tag }}
            </span> -->
            <span
              class="inline-flex items-center rounded-md px-3 py-1 text-xs font-medium bg-gray-200 ml-2"
            >
              {{ oneProduct?.product?.category }}
            </span>
            <h1 class="mt-3 text-2xl md:text-3xl font-bold">{{ oneProduct.product?.name }}</h1>

            <div class="mt-2 flex items-center gap-2">
              <!-- Stars -->
              <div class="flex items-center text-yellow-500">
                <span v-for="n in 5" :key="n">★</span>
              </div>
              <!-- <span class="text-sm text-gray-600"
                >{{ oneProduct.rating.rate }} ({{
                  oneProduct.rating.count
                }}
                reviews)</span
              > -->
            </div>
          </div>

          <div class="flex justify-start items-center gap-3">
            <p class="text-3xl font-bold text-primary-color">
              ${{ oneProduct.product?.price }}
            </p>
            <p class="line-through text-xl text-color-text">99$</p>
            <p
              class="inline-flex items-center rounded-md px-3 py-1 text-xs font-medium bg-red-500 text-white"
            >
              25% off
            </p>
          </div>
          <div>
            <p class="text-color-text font-bold mb-2">Description</p>
            <p class="leading-relaxed">
              {{ oneProduct?.product?.description }}
            </p>
          </div>
          <div class="flex justify-start items-center gap-3">
            <span class="font-semibold">Quantity : </span>
          <QuantityBtn v-model:quantity="quantity" />
          </div>
          <div class="flex items-center gap-3">
            <button @click="handleAddToCart"
              class="bg-primary-color w-full hover:bg-primary-color/90 text-white px-5 py-2 rounded-md"
            >
              Add to cart
            </button>
            <div
              class="p-2.5 border border-slate-300 rounded-md hover:bg-secondary-color hover:text-white transition-all ease-in-out duration-100"
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
            </div>
            <div
              class="p-2.5 border border-slate-300 rounded-md hover:bg-secondary-color hover:text-white transition-all ease-in-out duration-100"
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
                class="lucide lucide-share2 h-4 w-4"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Related products -->
      <div class="mt-16">
        <h3 class="text-2xl md:text-4xl font-semibold mb-4 text-color-text">
          Related products  
        </h3>
        <div
          class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
        >
        <RouterLink  v-for="pro in related.slice(0, 5)"
            :key="pro.id" :to="`/product/${pro._id}`">
          <ProductCard
           
            :id="pro.id"
            :name="pro.name"
            :description="pro.description"
            :image="pro.images[0]"
            :price="pro.price"
            :category="pro.category"
            tag="new"
          />
        </RouterLink>
          
        </div>
      </div>
    </div>
  </div>

  
   <div v-if="prodctStore.isGetProductById" class="min-h-screen bg-gray-50 animate-pulse">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Left image skeleton -->
        <div class="space-y-4">
          <div class="bg-white rounded-2xl shadow-sm p-4">
            <div class="w-full aspect-square bg-gray-200 rounded-xl"></div>
          </div>
          <div class="mt-4 grid grid-cols-4 gap-3">
            <div
              v-for="i in 4"
              :key="i"
              class="h-20 w-full bg-gray-200 rounded-xl"
            ></div>
          </div>
        </div>

        <!-- Right info skeleton -->
        <div class="space-y-6 text-color-text">
          <div class="h-6 bg-gray-200 rounded w-1/3"></div>
          <div class="h-8 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          <div class="flex gap-3 mt-4">
            <div class="h-10 bg-gray-200 rounded w-1/2"></div>
            <div class="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>

      <!-- Related products skeleton -->
      <div class="mt-16">
        <div class="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div
          class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
        >
          <div
            v-for="i in 5"
            :key="i"
            class="h-60 bg-gray-200 rounded-xl"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>


