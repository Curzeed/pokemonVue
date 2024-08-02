<script setup>
import {computed} from "vue";

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  }
});
const percentage = computed(() => (props.value / props.max) * 100);
</script>

<template>
  <div class="loading-bar-container">
    <div class="loading-bar" :style="{ width: `${percentage}%` }"></div>
  </div>
</template>

<style scoped>
.loading-bar-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.loading-bar {
  height: 20px;
  background-color: #76c7c0;
  transition: width 0.3s ease-in-out;
}
</style>