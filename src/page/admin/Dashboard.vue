<script setup>
import { onMounted, ref } from "vue";
import { useDashboardStore } from "../../stores/dashboard";
import StatsChart from "../../components/adminComponents/StatsChart.vue";
import LoadingComponent from "../../components/globals/LoadingComponent.vue";


const dashboardStore = useDashboardStore();

onMounted(async () => {
  if(Object.keys(dashboardStore.data).length===0){
   await dashboardStore.getDashboard();
  }else{
    return
  }

  
});

</script>

<template>
  <div  v-if="dashboardStore.isLoading" class="max-w-screen h-[80vh] flex justify-center items-center">
    <LoadingComponent />
  </div>

  <div v-else  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Revenue</p>
          <p class="text-2xl font-bold text-gray-900">
            ${{ dashboardStore?.data?.overview?.totalRevenue }}
          </p>
        </div>
        <div class="p-3 rounded-full bg-green-100">
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
            class="lucide w-6 h-6 text-green-600"
          >
            <line x1="12" x2="12" y1="2" y2="22"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide w-4 h-4 text-green-500 mr-1">
        <path d="M16 7h6v6"></path>
        <path d="m22 7-8.5 8.5-5-5L2 17"></path>
      </svg> -->
        <span class="text-sm text-green-600"
          >${{ dashboardStore?.data?.recent?.revenueThisMonth }}</span
        >
        <span class="text-sm text-gray-500 ml-1">This month</span>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Users</p>
          <p class="text-2xl font-bold text-gray-900">
            {{ dashboardStore?.data?.overview?.totalUsers }}
          </p>
        </div>
        <div class="p-3 rounded-full bg-blue-100">
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
            class="lucide w-6 h-6 text-blue-600"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <circle cx="9" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide w-4 h-4 text-green-500 mr-1">
        <path d="M16 7h6v6"></path>
        <path d="m22 7-8.5 8.5-5-5L2 17"></path>
      </svg> -->
        <span class="text-sm text-green-600">{{
          dashboardStore?.data?.recent?.newUsersThisMonth
        }}</span>
        <span class="text-sm text-gray-500 ml-1">This month</span>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Orders</p>
          <p class="text-2xl font-bold text-gray-900">
            {{ dashboardStore?.data?.overview?.totalOrders }}
          </p>
        </div>
        <div class="p-3 rounded-full bg-orange-100">
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
            class="lucide w-6 h-6 text-orange-600"
          >
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path
              d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
            ></path>
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide w-4 h-4 text-red-500 mr-1">
        <path d="M16 17h6v-6"></path>
        <path d="m22 17-8.5-8.5-5 5L2 7"></path>
      </svg> -->
        <span class="text-sm text-green-600">{{
          dashboardStore?.data?.recent?.ordersThisMonth
        }}</span>
        <span class="text-sm text-gray-500 ml-1">This month</span>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Products</p>
          <p class="text-2xl font-bold text-gray-900">
            {{ dashboardStore?.data?.overview?.totalProducts }}
          </p>
        </div>
        <div class="p-3 rounded-full bg-purple-100">
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
            class="lucide w-6 h-6 text-purple-600"
          >
            <path d="M12 6v6l4 2"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center">
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
          class="lucide w-4 h-4 text-green-500 mr-1"
        >
          <path d="M16 7h6v6"></path>
          <path d="m22 7-8.5 8.5-5-5L2 17"></path>
        </svg>
        <span class="text-sm text-green-600">+8.1%</span>
        <span class="text-sm text-gray-500 ml-1">vs last month</span>
      </div>
    </div>
  </div>

<div class="w-full mt-3">
    <StatsChart v-if="dashboardStore?.data?.recent"  :recent="dashboardStore?.data?.recent"  />
</div>

</template>
