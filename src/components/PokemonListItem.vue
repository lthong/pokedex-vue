<template>
  <div class="pokemon" @click="$emit('onCardClick', { id, name })">
    <div class="img-container">
      <img :src="getImgSrc(id)" :alt="name" />
    </div>
    <div class="info">
      <SaveMyPokeBtn :id="id" />
      <span class="number">{{ id.toString().padStart(3, '0') }}</span>
      <h3 class="name">{{ $t(`pokemonNames.${name}`) }}</h3>
    </div>
    <div class="types">
      <PokemonType v-for="(type) in types" :key="type" :type="type" />
    </div>
  </div>
</template>

<script>
import PokemonType from '@/components/PokemonType.vue';
import SaveMyPokeBtn from '@/components/SaveMyPokeBtn.vue';

export default {
  name: 'PokemonListItem',
  components: { PokemonType, SaveMyPokeBtn },
  props: {
    name: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      default: NaN,
    },
    types: {
      type: Array,
      default: [],
    },
  },
  methods: {
    getImgSrc(id) {
      return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id
        .toString()
        .padStart(3, '0')}.png`;
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon {
  width: 190px;
  height: 145px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 3px 0 15px rgba(100, 100, 100, 0.5);
  border-radius: 10px;
  margin: 70px 10px;
  padding: 20px;
  text-align: center;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition: transform 0.5s;
  cursor: pointer;
  .img-container {
    position: absolute;
    top: -110px;
    background-color: inherit;
    border-radius: 90px 90px 0 0;
    width: 150px;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      position: absolute;
      top: 3px;
      width: 120px;
      height: 120px;
    }
  }
  .info {
    width: 80%;
    position: relative;
    margin-top: 10px;
    .number {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      font-size: 0.8em;
      padding: 5px 10px;
    }
    .name {
      margin: 18px 0 7px;
      letter-spacing: 1px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 0.9em;
      &:first-letter {
        text-transform: uppercase;
      }
    }
  }
  .types {
    display: flex;
    margin-top: 5px;
    > div {
      width: 80px;
      margin: 5px;
    }
  }
  &:hover {
    transform: translate(0, -10px);
    box-shadow: 0 3px 15px rgb(248, 213, 148, 0.7);
    .img-container {
      box-shadow: 3px -5px 15px rgb(248, 213, 148, 0.7);
    }
  }
}
</style>
