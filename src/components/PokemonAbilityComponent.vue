<script setup>
import TruncatedText from "@/components/TruncatedText.vue";
import {capitalize} from "vue";
import {truncateText} from "@/api/helper.js";

const props = defineProps({
  moves: Object,
})
</script>

<template>
  <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Power</th>
      <th>Type</th>
      <th>PP</th>
      <th>Accuracy</th>
      <th>Effect</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="move in props.moves">
      <td>{{ capitalize(move.name) }}</td>
      <td>{{ move.power || '-' }}</td>
      <td :class="move.type.name + ' badge'">{{capitalize(move.type.name)}}</td>
      <td>{{ move.pp }}</td>
      <td>{{ move.accuracy ? (move.accuracy + '%') : '-'}}</td>
      <td><TruncatedText :text="move.effect_entries[0] ? truncateText(move.effect_entries[0].effect) : '-'" :maxLength="100"></TruncatedText></td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>
<style src="../assets/pokemon_types.css"></style>