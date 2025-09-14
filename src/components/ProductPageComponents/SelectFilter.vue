<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  label: String,
  options: Array,
  modelValue: {
    type: Array,
    default: () => [],
  },
});
const isOpen = ref(true);
const emit = defineEmits(["update:modelValue"]);

const selectedItems = ref([...props.modelValue]);
watch(selectedItems, (newVal) => {
  emit("update:modelValue", newVal);
});

function isOpenToggle() {
  isOpen.value = !isOpen.value;
}
</script>
<template>
  <div class="bg-green-100 text-color-text rounded-md">
    <div @click="isOpenToggle" class="flex justify-between items-center p-4">
      <div class="font-semibold">{{ label }}</div>
      <div>
        <p
          class="transition-all ease-in-out duration-200"
          :class="isOpen ? 'rotate-90' : 'rotate-270'"
        >
          >
        </p>
      </div>
    </div>

    <div
      class="px-4 overflow-hidden transition-all ease-in-out duration-200"
      :class="isOpen ? 'max-h-96 pb-4' : 'max-h-0'"
    >
      <ul>
        <li v-for="option in options" class="flex gap-5" :key="option.value">
          <input
            type="checkbox"
            v-model="selectedItems"
            :id="option.value"
            :value="option.value"
          />
          <label :for="option.value">{{ option.label }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>
