<script setup>
import { computed, onMounted, ref } from "vue";
import ProductCard from "../../components/ProductPageComponents/ProductCard.vue";
import { useProductStore } from "../../stores/product";


const productStore = useProductStore()
onMounted(async()=>{
  if(!productStore.response?.products){
   await productStore.getAllProduct();

  }
})

</script>
<template>

  <section
    id="hiro"
    class="bg-primary-light md:py-10 px-4 sm:px-10 md:px-16 lg:px-[120px]"
  >
    <div
      class="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-10 py-10"
    >
      <!-- left -->
      <div class="space-y-6">
        <h1 class="text-color-text text-4xl md:text-6xl font-bold md:leading-[80px]">
          Discover Your Perfect <span class="text-primary-color">Style</span>
        </h1>
        <p class="text-[18px] text-color-text max-w-md">
          Shop our curated collection of premium products designed for modern
          living. Quality, style, and sustainability in every purchase.
        </p>
        <div class="flex flex-col md:flex-row md: gap-5">
          <RouterLink to="/product" class="w-full md:w-fit">
            <button
            class="w-full bg-primary-color hover:bg-primary-color/90 text-white px-5 py-2 rounded-md"
          >
            Shop Now
          </button>
          </RouterLink>
        </div>
        <div class="flex justify-start items-center gap-5 mt-20">
          <div>
            <p class="text-primary-color text-2xl font-semibold">10K+</p>
            <p class="text-color-text">Happy Customers</p>
          </div>
          <div>
            <p class="text-primary-color text-2xl font-semibold">500+</p>
            <p class="text-color-text">Products</p>
          </div>
          <div>
            <p class="text-primary-color text-2xl font-semibold">99%</p>
            <p class="text-color-text">Satisfaction</p>
          </div>
        </div>
      </div>
      <!-- right -->
      <div>
        <img 
          class="rounded-md hover:scale-105 hover:rotate-2 transition-all ease-in-out duration-500"
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-minimalist-lifestyle-products-hero-image-qFmYPnN5pcozBw5gziLX0dnIjJI36E.png"
          alt="hiro"
        />
      </div>
    </div>
  </section>
  <section class="section text-center mt-8">
    <h2 class="font-bold text-primary-color">lastest Products</h2>
    <p class="text-color-text mt-3">
      Discover our handpicked selection of premium products that combine style,
      functionality, and sustainability.
    </p>
    <div class="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 md:mx-20 lg:mx-16">
      <!-- card -->
      <RouterLink   v-for="pro in productStore.response?.products?.slice(0,4)" :to="`/product/${pro._id}`" >
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
    <button
      class="mt-16 bg-white text-color-text shadow-md border border-gray-200 px-5 py-2 rounded-sm hover:bg-secondary-color hover:text-white hover:border-secondary-color transition-all ease-in-out duration-200"
    >
      <RouterLink to="/product">See All</RouterLink>
    </button>
  </section>
</template>
