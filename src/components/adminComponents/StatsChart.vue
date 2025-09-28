<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";
import { computed } from "vue";
import LoadingComponent from "../globals/LoadingComponent.vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  recent: {
    type: Object,
    required: true,
  },
});

// check if data is available
const isLoading = computed(() => {
  // if props.recent is undefined or empty
  return (
    !props.recent ||
    Object.keys(props.recent).length === 0 ||
    props.recent.newUsersThisMonth === undefined
  );
});

const labels = [
  "New Users",
  "Orders This Month",
  "Orders Today",
  "$ Revenue This Month",
  "$ Revenue Today",
];

const values = computed(() => [
  props?.recent?.newUsersThisMonth,
  props?.recent?.ordersThisMonth,
  props?.recent?.ordersToday,
  props?.recent?.revenueThisMonth,
  props?.recent?.revenueToday,
]);

const chartData = computed(() => ({
  labels,
  datasets: [
    {
      label: "Statistics",
      data: values.value,
      backgroundColor: "#0b6902",
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Recent Stats",
    },
  },
};
</script>

<template>
  <div class="w-full h-96 flex items-center justify-center">
    <!-- show spinner or loading text -->
    <!-- <LoadingComponent v-if="isLoading"/> -->
    <!-- show chart only when data ready -->
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
