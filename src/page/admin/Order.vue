<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { useOrderStore } from "../../stores/order";
import dayjs from "dayjs";
import { useToast } from "vue-toastification";
const orderStore = useOrderStore();

const orders = ref([]);

const search = ref("");
const category = ref("all");

const editingID = ref(null);
const editPayment = ref("");

const editPaymentStatus = (order) => {
  editingID.value = order._id;
  editPayment.value = order.paymentStatus;
};

onMounted(async () => {
  if (!orderStore.order?.orders) {
    await orderStore.getAllOrder();
  }
  orders.value = orderStore.order?.orders;
});
function filterProducts() {
  orders.value = orderStore?.order?.orders?.filter((e) => {
    const matchedSearch = search.value === "" ? true : e?._id === search.value;
    const matchedCategory =
      category.value === "all" ? true : e.paymentStatus == category.value;
    return matchedSearch && matchedCategory;
  });
}
async function saveUpdate(id) {
  if (editPayment.value.trim() === "") {
    editingID.value = null;
    return;
  }
  const response = await orderStore.updateOrderStatue(id, editPayment.value);
  if (response) {
    await orderStore.getAllOrder();
    editingID.value = null;
  }
}
function deleteOrder(){
  const toast = useToast()

  toast.warning("this feature not allow yet",{timeout:2000})
}
watch([() => orderStore?.order, search, category], () => filterProducts());
</script>
<template>


  <!-- content -->
  <div class="flex justify-between items-center">
    <h3 class="text-2xl text-color-text font-semibold">Orders List</h3>
  </div>
  <div class="bg-white p-4 rounded-md mt-5">
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <input
          type="text"
          v-model="search"
          placeholder="Search ID..."
          class="w-72 px-4 py-2 text-xs rounded-lg border border-gray-300 focus:border-slate-300 focus:ring-2 focus:ring-slate-200 outline-none transition-all duration-200 flex-1"
        />
      </div>
      <div class="flex justify-center items-center gap-2">
        <select
          v-model="category"
          class="border border-slate-300 p-1.5 rounded-md focus:ring-0 outline-0"
        >
          <option value="all" selected>All</option>
          <option value="pending">pending</option>
          <option value="completed">completed</option>
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
            Order
          </th>
          <th
            class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Date
          </th>
          <th
            class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Customer
          </th>
          <th
            class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Payment
          </th>
          <th
            class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Total
          </th>
          <th
            class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Items
          </th>
          <th
            class="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="order in orders" :key="order?._id" class="text-xs">
          <td class="py-3 px-6 text-color-text">{{ order?._id }}</td>
          <td class="py-3 px-6 text-color-text">
            {{ dayjs(order?.createdAt).format("D MMM YYYY") }}
          </td>
          <td class="py-3 px-6 text-color-text">{{ order?.user?.name }}</td>
          <td class="py-3 px-6 text-green-600 ">
            <div class="flex items-center justify-start">
              

            <div v-if="editingID === order._id">
              <select
                v-model="editPayment"
                :class="editPayment === 'pending'?'text-yellow-400' : 'text-green-400'"
                class="w-full  border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1"
                autofocus
              >
                <option class="text-yellow-400" value="pending">Pending</option>
                <option class="text-green-400" value="completed">Completed</option>
              </select>
              <!-- <input v-model="editPayment" @keyup.enter="saveUpdate(order?._id)"
                                class="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                                autofocus /> -->
            </div>
            <div
              v-else
              @dblclick="editPaymentStatus(order)"
              class="cursor-pointer hover:text-green-800 transition-colors "
              :class="
                order?.paymentStatus === 'pending'
                  ? 'text-yellow-400'
                  : 'text-green-500'
              "
            >
              {{ order?.paymentStatus }}
            </div>
            <button
              v-if="editingID != order?._id"
              @click="editPaymentStatus(order)"
              data-v-_v0_vue_=""
              class="p-1.5 cursor-pointer hover:bg-muted rounded-md transition-colors text-color-text"
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
            </div>
          </td>
          <td class="py-3 px-6 text-color-text">${{ order?.totalAmount }}</td>
          <td class="py-3 px-6 text-color-text">{{ order?.items?.length }}</td>

          <td class="py-4 px-6 flex items-center gap-2">
            <button
            @click="deleteOrder"
              v-if="editingID != order?._id"
              data-v-_v0_vue_=""
              class="p-1.5 hover:bg-muted rounded-md transition-colors cursor-pointer"
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
            <button
              v-else
              @click="editingID = null"
              class="text-gray-400 text-xl cursor-pointer"
            >
              x
            </button>
            <button
              v-if="editingID == order?._id"
              @click="saveUpdate(order?._id)"
              class="p-1.5 cursor-pointer"
            >
              <i class="fa-solid fa-check text-xs text-green-500 mt-0.5"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
