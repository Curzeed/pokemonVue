<script>
import {onMounted, ref} from "vue";
import apiService from "@/api/apiService.js";
import PokemonCardComponent from "@/components/PokemonCardComponent.vue";
import 'vue-loading-overlay/dist/css/index.css'
import Loading from 'vue-loading-overlay'

export default {
  components: {PokemonCardComponent, Loading},
  setup() {
    const data = ref(null);
    const loading = ref(null);
    const error = ref(null);
    const fetchPokemons = async () => {
      try {
        loading.value = true;
        await new Promise(resolve => setTimeout(resolve, 10000));
        const response = await apiService.getData("pokemon?limit=25");
        let pokemonArray = [];
        const pokemonData = response.data.results;
        for (let i = 0; i < pokemonData.length; i++) {
          const pokemon = await apiService.getData(pokemonData[i].url);
          pokemonArray.push(pokemon.data);
        }
        data.value = pokemonArray;
      }catch (err){
        error.value = "Failed to fetch data";
        console.error(err);
      }finally {
        loading.value = false;
      }
    }
    onMounted(() => {
      fetchPokemons();
    })
    return {data, loading, error};
  },
  methods: {
    // goToAbout() {
    //   this.$router.push('/about')
    // },
  },
}
</script>

<template>
  <div>
    <h2>Data View</h2>
    <loading :active.sync="loading" :is-full-page="true"/>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="!loading" class="pokemon-list">
      <div v-for="pokemon in data">
        <PokemonCardComponent :pokemon="pokemon" :key="pokemon.id"></PokemonCardComponent>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pokemon-list{
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
}
</style>