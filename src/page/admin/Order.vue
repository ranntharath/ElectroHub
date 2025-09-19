<script setup>
import { onMounted, ref } from 'vue';
import { useOrderStore } from '../../stores/order';

const orderStore = useOrderStore()

const orders = ref({})
onMounted(async()=>{
    orders.value = await orderStore.getAllOrder()
    console.log(orders.value?.orders)
})
</script>
<template></template>