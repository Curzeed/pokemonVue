<!-- src/views/DetailView.vue -->
<template>
  <div>
    <h1>Detail Page</h1>
    <p>ID: {{ id }}</p>
    <!-- Ajoutez plus de détails ici -->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// Récupérer le paramètre de route
const route = useRoute()
const id = ref(route.params.id)

// Vous pouvez également récupérer des données supplémentaires ici
const details = ref(null)

onMounted(async () => {
  // Par exemple, appeler une API pour récupérer les détails
  const response = await fetch(`https://api.example.com/items/${id.value}`)
  details.value = await response.json()
})
</script>

<style scoped>
/* Ajoutez des styles spécifiques ici */
</style>
