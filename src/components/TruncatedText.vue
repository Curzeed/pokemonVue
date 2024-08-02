<template>
  <span>
    <span v-if="isTruncated">
      {{ truncatedText }}
      <span v-if="!isShort" class="ellipsis" @click="toggleTruncate">...</span>
    </span>
    <span v-else>
      {{ text }}
      <span v-if="!isShort" class="show-less" @click="toggleTruncate"> Show less</span>
    </span>
  </span>
</template>

<script setup>
import {ref, computed} from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  maxLength: {
    type: Number,
    default: 100
  }
});

const isTruncated = ref(true);
const isShort = ref(false);

const truncatedText = computed(() => {
  if (props.text.length <= props.maxLength) {
    isShort.value = true;
    return props.text;
  }
  isShort.value = false;
  return props.text.substring(0, props.maxLength);
});

const toggleTruncate = () => {
  isTruncated.value = !isTruncated.value;
};
</script>

<style scoped>
.ellipsis, .show-less {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>
