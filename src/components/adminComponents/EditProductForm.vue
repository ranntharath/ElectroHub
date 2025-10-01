<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useProductStore } from '../../stores/product';

const props = defineProps({
  show: Boolean,
  product:Object
});
const emit = defineEmits(["cancel"])

const productStore = useProductStore()
const productData = ref({});
const images = ref([])

function removeImage(index){
  if(images.value.length > 1){
    images.value.splice(index,1)
  }

}
function addImage() {
  if (images.value.length < 4) {
    images.value.push("");
  }
}
watchEffect(()=>{
    productData.value = {...props.product}
   images.value= productData.value?.images
    console.log(productData.value)  
})

async function saveEdit(){
    const response = await productStore.editProduct(productData.value?._id,productData.value)
    if(response){
        emit('cancel')
        await productStore.getAllProduct()
    }

}

</script>
<template>
  <div v-if="show" class="inset-0 z-50 flex items-center justify-center">
    <form @submit.prevent="saveEdit" class="bg-white rounded-2xl shadow p-6 space-y-5">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold text-slate-800">Edit Product</h2>
        <p @click="$emit('cancel')" class="text-2xl cursor-pointer">x</p>
      </div>

      <!-- Name -->
      <div>
        <label class="block text-sm font-medium text-slate-700"
          >Product Name</label
        >
        <input
          v-model="productData.name"
          type="text"
          name="name"
          class="mt-1 block w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter product name"
          required
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-slate-700"
          >Description</label
        >
        <textarea
          v-model="productData.description"
          name="description"
          rows="4"
          class="mt-1 block w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter product description"
          required
        ></textarea>
      </div>

      <!-- Price & Stock -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-700"
            >Price ($)</label
          >
          <input
            v-model="productData.price"
            type="number"
            name="price"
            class="mt-1 block w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. 323"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700">Stock</label>
          <input
            v-model="productData.stock"
            type="number"
            name="stock"
            class="mt-1 block w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. 50"
            required
          />
        </div>
      </div>

      <!-- Category -->
      <div>
        <label class="block text-sm font-medium text-slate-700">Category</label>
        <select
          v-model="productData.category"
          name="category"
          class="mt-1 block w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        >
          <option value="" selected disabled>Choose category</option>
          <option value="phone">Phone</option>
          <option value="laptop">Laptop</option>
          <option value="desktop">Desktop</option>
          <option value="monitor">Monitor</option>
        </select>
      </div>

      <!-- Brand -->
      <div>
        <label class="block text-sm font-medium text-slate-700">Brand</label>
        <input
          v-model="productData.brand"
          type="text"
          name="brand"
          class="mt-1 block w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g. Old Style"
        />
      </div>

      <!-- Images (multiple URLs or file upload) -->
      <div>
        <div class="flex justify-between items-center">
          <label class="block text-sm font-medium text-slate-700"
            >Product Images</label
          >
          <button
          type="button"
            @click="addImage"
            class="p-1.5 py-0.5 bg-primary-color text-white rounded-md text-sm"
          >
            + add
          </button>
        </div>
<div v-for="(url, index) in images" :key="index" class="flex items-center gap-2 mt-2">
  <input
    type="text"
    v-model="images[index]"
    class="flex-1 border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    placeholder="URL"
  />
  
  <!-- Remove button -->
  <button
    type="button"
    @click="removeImage(index)"
    class="text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded-md border border-red-500"
  >
    -
  </button>
</div>
        <p class="mt-1 text-xs text-slate-400">
          You can select multiple images
        </p>
      </div>

      <!-- Submit -->
      <div class="flex gap-4 items-center">
        <button @click="$emit('cancel')"
        type="button"
        class="w-full bg-gray-400 text-white py-2 px-4 rounded-xl hover:bg-slate-500 transition"
      >
      Cancel
        
      </button>
      <button 
        type="submit"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition"
      >
      {{ productStore.isEdit? 'Edit...' : 'Save'}}
        
      </button>
      </div>
    </form>
  </div>
</template>