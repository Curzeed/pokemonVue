<script>
import {computed, onMounted, ref, watch} from "vue";
import apiService from "@/api/apiService.js";
import PokemonCardComponent from "@/components/PokemonCardComponent.vue";
import 'vue-loading-overlay/dist/css/index.css';
import Loading from 'vue-loading-overlay';

export default {
  components: { PokemonCardComponent, Loading },
  setup() {
    const data = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const page = ref(1);
    const limit = ref(50); // Nombre d'éléments par page
    const hasMore = ref(true);
    const scrollContainer = ref(null);
    const searchQuery = ref('');

    const fetchPokemons = async () => {
      try {
        loading.value = true;
        const response = await apiService.getData("pokemon?limit=" + limit.value + "&offset=" + (page.value - 1) * limit.value);
        let pokemonArray = [];
        const pokemonData = response.data.results;
        for (let i = 0; i < pokemonData.length; i++) {
          const pokemon = await apiService.getData(pokemonData[i].url);
          pokemonArray.push(pokemon.data);
        }
        data.value = [...data.value, ...pokemonArray]; // Ajouter les nouveaux éléments à la liste existante
        if (pokemonData.length < limit.value) {
          hasMore.value = false; // Si le nombre d'éléments retournés est inférieur à la limite, il n'y a plus de données à charger
        }
      } catch (err) {
        error.value = "Failed to fetch data";
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchPokemons();
    });

    const onScroll = () => {
      if (!scrollContainer.value) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore.value && !loading.value) {
        page.value++;
        fetchPokemons();
      }
    };

    const filteredData = computed(() => {
      if (!searchQuery.value) {
        return data.value;
      }
      return data.value.filter(pokemon =>
          pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Watcher for search query to reset pagination and refetch data
    watch(searchQuery, () => {
      data.value = [];
      page.value = 1;
      hasMore.value = true;
      fetchPokemons();
    });

    return { data, loading, error, scrollContainer, onScroll, searchQuery, filteredData };
  },
};
</script>

<template>
  <div @scroll.passive="onScroll" ref="scrollContainer" class="scroll-container">
    <input v-model="searchQuery" @input="onSearch" placeholder="Search a pokemon..." />
    <loading :active.sync="loading" :is-full-page="true"/>
    <div v-if="error">{{ error }}</div>
    <div v-else class="pokemon-list">
      <div v-for="pokemon in filteredData" :key="pokemon.id">
        <PokemonCardComponent :pokemon="pokemon"></PokemonCardComponent>
      </div>
    </div>
  </div>
</template>


<style scoped>
.scroll-container {
  height: 80vh; /* Ajustez en fonction de votre layout */
  overflow-y: auto;
}

.pokemon-list {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
}
</style>