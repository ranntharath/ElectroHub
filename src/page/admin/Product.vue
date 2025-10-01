<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { useProductStore } from "../../stores/product";
import AddProductForm from "../../components/adminComponents/AddProductForm.vue";

const productStore = useProductStore();
const showForm = ref(false);
const search = ref("");
const productShow = ref([]);
const category = ref('all')
// watchEffect(() => {
//   if (search.value === "") {
//     productShow.value = productStore.response?.products;
//   }
// });
watch(()=>category.value, ()=>{
  console.log(category.value)
})
onMounted(async () => {
  await productStore.getAllProduct();
  productShow.value = productStore.response?.products;
});
function filterProducts() {
  productShow.value = productStore.response?.products?.filter((e) => {
    const matchedSearch =
      search.value === ""
        ? true
        : e.name.toLowerCase().includes(search.value.toLowerCase());
    const matchedCategory = category.value === "all" ? true : e.category == category.value
    return matchedSearch && matchedCategory
  });
}
</script>
<template>
  <div
    v-if="showForm"
    class="absolute overflow-auto inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <AddProductForm :show="showForm" @cancel="showForm = false" />
  </div>
  <div class="flex justify-between items-center">
    <h3 class="text-2xl text-color-text font-semibold">Product List</h3>
    <button
      @click="showForm = true"
      class="flex justify-center items-center gap-2 bg-primary-color hover:bg-primary-color/90 text-white px-5 py-1.5 rounded-md"
    >
      <span class="text-xl">+</span>
      <span>Add Product</span>
    </button>
  </div>
  <div class="bg-white p-4 rounded-md mt-5">
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <input
          type="text"
          v-model="search"
          placeholder="Search..."
          class="px-4 py-1.5 rounded-lg border border-gray-300 focus:border-slate-300 focus:ring-2 focus:ring-slate-200 outline-none transition-all duration-200 flex-1"
        />
        <button
          @click="filterProducts"
          class="px-4 py-1.5 bg-primary-color text-white rounded-lg hover:bg-primary-color/90 transition"
        >
          Search
        </button>
      </div>
      <div class="flex justify-center items-center gap-2">
        <select v-model="category" @click="filterProducts"
          class="border border-slate-300 p-1.5 rounded-md focus:ring-0 outline-0"
        >
          <option value="all" selected>All</option>
          <option value="phone">Phone</option>
          <option value="laptop">Laptop</option>
          <option value="desktop">Desktop</option>
          <option value="monitor">Monitor</option>
        </select>
        <button
          class="flex justify-center items-center bg-white text-color-text border border-gray-200 px-5 py-1 rounded-sm hover:bg-secondary-color hover:text-white hover:border-secondary-color transition-all ease-in-out duration-200"
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
      </div>
    </div>

    <!-- table -->
    <table class="w-full mt-4">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th
            class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Product Name
          </th>
          <th
            class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Category
          </th>
          <th
            class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            brand
          </th>
          <th
            class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            price
          </th>
          <th
            class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            stock
          </th>
          <th
            class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="pro in productShow">
          <td class="text-left py-3 px-6 text-color-text">
            <div class="flex items-center">
              <img
                :src="pro?.images?.[0]"
                :alt="pro?.name"
                class="w-8 h-8 rounded-full mr-3"
              />
              <span>{{ pro?.name }}</span>
            </div>
          </td>
          <td class="py-3 px-6 text-color-text">{{ pro?.category }}</td>
          <td class="py-3 px-6 text-color-text">{{ pro?.brand }}</td>
          <td class="py-3 px-6 text-green-600">${{ pro?.price }}</td>
          <td
            class="py-3 px-6 text-color-text"
            :class="{ 'text-red-500': pro?.stock < 10 }"
          >
            {{ pro?.stock }}
          </td>
          <td class="py-4 px-6 flex items-center">
            <button
              data-v-_v0_vue_=""
              class="p-1.5 hover:bg-muted rounded-md transition-colors"
              title="Edit"
            >
              <svg
                data-v-_v0_vue_=""
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  data-v-_v0_vue_=""
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </button>
            <!-- <button class="p-1.5"><i class="fa-solid fa-check text-xs text-green-500"></i></button> -->
            <button
              @click="showConfirm = true"
              data-v-_v0_vue_=""
              class="p-1.5 hover:bg-muted rounded-md transition-colors"
              title="Delete"
            >
              <svg
                data-v-_v0_vue_=""
                class="w-4 h-4 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  data-v-_v0_vue_=""
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
