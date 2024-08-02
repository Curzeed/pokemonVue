<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
  pokemon : Object,
})
const imgSrc = ref(null);
onMounted(() => {
  imgSrc.value = props.pokemon.sprites.other.dream_world.front_default;
})
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<template>
<div class="card">
  <div class="card-title">{{capitalize(pokemon.name)}}</div>
  <div class="card-img"><img :src="imgSrc" alt=""></div>
  <div class="card-type">
    <div v-for="type in pokemon.types" :key="type.type.name" :class="type.type.name + ' badge' ">{{capitalize(type.type.name)}}</div>
  </div>
  <span class="btn-link">
    <router-link :to="{ name: 'Details', params: { id: pokemon.id } }">Details</router-link>
  </span>
</div>
</template>

<style scoped>
.card{
  width: 200px;
  height: 200px;
  background-color: #f3f3f3;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;
}
.badge{
  padding: 5px;
  border-radius: 5px;
  color: white;
}
.card-type{
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 4px;
}
.card-title{
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}
.card-img{
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-img > img {
  width: 100px;
  height: 100px;
}
.btn-link{
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.btn-link > a {
  text-decoration: none;
  color: #000;
  padding: 5px 10px;
  border: 1px solid #000;
  border-radius: 5px;
  transition: ease-in-out 0.3s;
}
.btn-link > a:hover {
  background-color: #000;
  color: #fff;
}
.bug {
  background: #92BC2C;

}

.dark {
  background: #595761;

}

.dragon {
  background: #0C69C8;

}

.electric {
  background: #F2D94E;

}

.fire {
  background: #FBA54C;

}

.fairy {
  background: #EE90E6;

}

.fighting {
  background: #D3425F;

}

.flying {
  background: #A1BBEC;

}

.ghost {
  background: #5F6DBC;

}

.grass {
  background: #5FBD58;

}

.ground {
  background: #DA7C4D;

}

.ice {
  background: #75D0C1;
}

.normal {
  background: #A0A29F;

}

.poison {
  background: #B763CF;

}

.psychic {
  background: #FA8581;

}

.rock {
  background: #C9BB8A;

}

.steel {
  background: #5695A3;

}

.water {
  background: #539DDF;

}

</style>