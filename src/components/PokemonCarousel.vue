<script setup>
import { ref, onMounted } from 'vue';
import 'boxicons';
import apiService from "@/api/apiService.js";
import router from "@/router.js";

const props = defineProps({
  pokemon: Object,
  imgSrc: String
});
const previousPokemon = ref(null);
const nextPokemon = ref(null);
const fetchEvolution = (async () => {
    const responseRaw = await apiService.getData(props.pokemon.species.url);
    const response = responseRaw.data;
    const evolutionChainUrl = response.evolution_chain.url;
    const responseEvolutionChainRaw = await apiService.getData(evolutionChainUrl);
    const responseEvolutionChain = responseEvolutionChainRaw.data;
    let chain = responseEvolutionChain.chain;
    let firstPokemon = chain.species.name;
    let secondPokemon = chain.evolves_to[0].species.name;
    let thirdPokemon = chain.evolves_to[0].evolves_to[0] ? chain.evolves_to[0].evolves_to[0].species.name : null;
    if(firstPokemon === props.pokemon.name){
      nextPokemon.value = await fetchPokemonByName(secondPokemon);
    }
    if(secondPokemon === props.pokemon.name){
      previousPokemon.value = await fetchPokemonByName(firstPokemon);
      nextPokemon.value = await fetchPokemonByName(thirdPokemon);
    }
    if(thirdPokemon === props.pokemon.name) {
      previousPokemon.value = await fetchPokemonByName(secondPokemon);
    }
});
const fetchPokemonByName = async (name) => {
  try {
    const response = await apiService.getData(`pokemon/${name}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
const redirectToDetail = (pokemonId) => {
  location.href = `/details/${pokemonId}`;
};
onMounted(() => {
  fetchEvolution();
});
</script>

<template>
  <div class="mini-carousel">
    <div class="previous" v-if="previousPokemon" @click="redirectToDetail(previousPokemon.id)">
      <box-icon name='left-arrow-circle' ></box-icon>
    </div>
    <div class="img">
      <img :src="imgSrc" alt="Pokemon" class="pokemon-image" />
    </div>
    <div class="next" v-if="nextPokemon" @click="redirectToDetail(nextPokemon.id)">
      <box-icon name='right-arrow-circle' ></box-icon>
    </div>
  </div>
</template>

<style scoped>

</style>