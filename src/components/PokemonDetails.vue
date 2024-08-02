<script>
import {ref, onMounted, capitalize} from 'vue';
import { useRoute } from 'vue-router';
import apiService from "@/api/apiService.js";
import Loading from "vue-loading-overlay";
import 'vue-loading-overlay/dist/css/index.css';
import BarStatPokemonComponent from '@/components/BarStatPokemonComponent.vue';
import {truncateText} from "@/api/helper.js";
import TruncatedText from "@/components/TruncatedText.vue"; // Ajustez le chemin selon votre structure de projet

export default {
  methods: {truncateText, capitalize},
  components: {TruncatedText, BarStatPokemonComponent, Loading },
  setup() {
    // Récupérer le paramètre de route
    const route = useRoute();
    const id = ref(route.params.id);
    const pokemon = ref(null);
    const imgSrc = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const moves = ref([]);

    // Appeler une API pour récupérer les détails
    const fetchPokemon = async () => {
      try {
        loading.value = true;
        const response = await apiService.getData(`pokemon/${id.value}`);
        pokemon.value = response.data;
        imgSrc.value = pokemon.value.sprites.other.dream_world.front_default;

        const moveRequests = response.data.moves.map(move =>
            apiService.getData(move.move.url)
        );

        const moveResponses = await Promise.all(moveRequests);
        moves.value = moveResponses.map(res => res.data);
      } catch (err) {
        error.value = 'Failed to fetch Pokémon details';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchPokemon();
    });

    return { pokemon, imgSrc, loading, error, moves };
  }
};
</script>

<!-- src/views/DetailView.vue -->
<template>
  <div>
    <loading :active.sync="loading" :is-full-page="true" />
    <div v-if="error">{{ error }}</div>
    <div v-else-if="pokemon">
      <div class="pokemon-detail-container">
        <div class="pokemon-header">
          <img :src="imgSrc" alt="Pokemon Image" class="pokemon-image" />
          <h1 class="pokemon-name">{{ pokemon.name }}</h1>
          <div class="pokemon-types">
            <span v-for="type in pokemon.types" :key="type.type.name" :class="'type ' + type.type.name">{{ type.type.name }}</span>
          </div>
        </div>
        <div class="pokemon-stats">
          <h2>Stats</h2>
            <div v-for="stat in pokemon.stats" :key="stat.stat.name">
              <strong>{{ capitalize(stat.stat.name) }}</strong>
              <BarStatPokemonComponent :max="100" :value="Number(stat.base_stat)" />
            </div>
        </div>
        <div class="pokemon-info">
          <h2>Informations</h2>
          <p><strong>Height:</strong> {{ pokemon.height }} dm</p>
          <p><strong>Weight:</strong> {{ pokemon.weight }} hg</p>
          <p><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>
        </div>
        <div class="pokemon-spells">
          <h2>Spells</h2>
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
              <tr v-for="move in moves">
                <td>{{ capitalize(move.name) }}</td>
                <td>{{ move.power || '-' }}</td>
                <td :class="move.type.name + ' badge'">{{capitalize(move.type.name)}}</td>
                <td>{{ move.pp }}</td>
                <td>{{ move.accuracy ? (move.accuracy + '%') : '-'}}</td>
                <td><TruncatedText :text="move.effect_entries[0] ? truncateText(move.effect_entries[0].effect) : '-'" :maxLength="100"></TruncatedText></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge{
  padding: 5px;
  border-radius: 5px;
  color: white;
}
.pokemon-detail-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.pokemon-header {
  text-align: center;
  margin-bottom: 20px;
}

.pokemon-image {
  width: 200px;
  height: auto;
  margin-bottom: 10px;
}

.pokemon-name {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-transform: capitalize;
}

.pokemon-types {
  display: flex;
  justify-content: center;
}

.type {
  margin: 0 5px;
  padding: 5px 10px;
  border-radius: 20px;
  color: #fff;
  text-transform: capitalize;
}

.type.grass {
  background-color: #78c850;
}

.type.poison {
  background-color: #a040a0;
}

/* Add styles for other types as needed */

.pokemon-stats, .pokemon-info {
  margin-bottom: 20px;
}

.pokemon-stats ul {
  list-style: none;
  padding: 0;
}

.pokemon-stats li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.pokemon-info p {
  margin: 5px 0;
}
</style>
<style src="../assets/pokemon_types.css"></style>
