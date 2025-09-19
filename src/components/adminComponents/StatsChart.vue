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

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// Props (data passed from parent)
const props = defineProps({
  recent: {
    type: Object,
    required: true,
  },
});

// Prepare labels and values
const labels = [
  "New Users",
  "Orders This Month",
    "Orders Today",
  "$ Revenue This Month",
  "$ Revenue Today",
];
const values = [
  props?.recent?.newUsersThisMonth,
  props?.recent?.ordersThisMonth,
props?.recent?.ordersToday,
  props?.recent?.revenueThisMonth,
  props?.recent?.revenueToday,
];

const chartData = {
  labels,
  datasets: [
    {
      label: "Statistics",
      data: values,
      backgroundColor: "#0b6902"
    },
  ],
};

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
  <div class="w-full  h-96 ">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
<style>
canvas {
  max-width: 100% !important;
}
</style>
