<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import SelectFilter from "../../components/ProductPageComponents/SelectFilter.vue";
import ProductCard from "../../components/ProductPageComponents/ProductCard.vue";
import { useProductStore } from "../../stores/product";
import ProductLoading from "../../components/ProductPageComponents/ProductLoading.vue";

// Filter options
const categories = [
  { label: "Phone", value: "phone" },
  { label: "Laptop", value: "laptop" },
  { label: "Desktop", value: "desktop" },
  { label: "Hardware", value: "hardware" },
];

const brands = [
  { label: "Eco Living", value: "eco living" },
  { label: "Modern Home", value: "modern home" },
  { label: "Old Style", value: "old style" },
];

// Store
const productStore = useProductStore();

// Reactive data
const selectedCategories = ref([]);
const selectedBrands = ref([]);
const isFilter = ref(true);

// Fetch products on mount
onMounted(async () => {
  if(!productStore.response?.products){
   await productStore.getAllProduct();

  }
});
watchEffect(()=>{
   console.log(productStore.isLoading)
})
// const products = computed(() => productStore.response.products );

// Filtered products
const filterProducts = computed(() => {
  if(productStore.isLoading) {
    return [];
  }
  return productStore.response?.products?.filter((pro) => {
    const matchesCategory =
      selectedCategories.value.length === 0
        ? true
        : selectedCategories.value.includes(pro.category);

    const matchesBrand =
      selectedBrands.value.length === 0
        ? true
        : selectedBrands.value.includes(pro.brand);

    return matchesCategory && matchesBrand;
  });
});

</script>
<template>
  <section class="section">
    <h2 class="text-color-text font-bold">All Products</h2>
    <p class="text-color-text">
      Discover our complete collection of sustainable, modern lifestyle products
    </p>
    <input
      type="text"
      id="name"
      placeholder="Search Product..."
      class="px-4 py-2 w-full md:w-96 rounded-lg border border-gray-300 focus:border-slate-300 focus:ring-2 focus:ring-slate-200 outline-none transition-all duration-200 mt-5"
    />
    <div class="grid grid-cols-1 lg:grid-cols-4 mt-10 gap-5">
      <div class="lg:col-span-1 space-y-3">
        <button
          @click="isFilter = !isFilter"
          class="flex justify-center items-center lg:hidden bg-white w-full text-color-text shadow-md border border-gray-200 px-5 py-2 rounded-sm hover:bg-secondary-color hover:text-white hover:border-secondary-color transition-all ease-in-out duration-200"
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
            class="lucide lucide-filter h-4 w-4 mr-2"
          >
            <polygon
              points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
            ></polygon>
          </svg>

          <p>Filters</p>
        </button>
        <div
          :class="{ block: isFilter, hidden: !isFilter }"
          class="lg:block space-y-3"
        >
          <SelectFilter
            label="Categories"
            :options="categories"
            v-model="selectedCategories"
          />
          <SelectFilter
            label="Brands"
            :options="brands"
            v-model="selectedBrands"
          />
        </div>
      </div>
      <div class="lg:col-span-3">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <ProductLoading v-if="productStore.isLoading" v-for="n in 4"/>
          <RouterLink v-else  v-for="pro in filterProducts" :key="pro.id" :to="`/product/${pro._id}`" >
            <ProductCard 
           
            
            :id="pro._id"
            :name="pro.name"
            :description="pro.description"
            :image="pro.images[0]"
            :price="pro.price"
            :category="pro.category"
          />
          </RouterLink>
          
          
        </div>
      </div>
    </div>
  </section>
</template>
