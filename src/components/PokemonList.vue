<template>
  <div class="pokedex-list">
    <div class="search-field">
      <div class="form">
        <label for="keyword">
          <img :src="assets.searchIcon" alt="search-icon" />
        </label>
        <input
          id="keyword"
          class="keyword-input"
          :value="searchKeyword"
          @input="onSearchValueChange"
          :placeholder="$t('common.search_placeholder')"
        />
        <div class="reset-btn" @click="onReset">
          {{ $t('common.reset') }}
        </div>
      </div>
      <div class="poke-types">
        <PokemonType
          v-for="type in pokeTypes"
          :key="type"
          :type="type"
          :class="{ active: type === searchType }"
          @onTypeChange="onTypeChange"
        />
      </div>
    </div>
    <div class="content">
      <div
        v-for="{ name, id, types } in pokeData"
        :key="id"
        class="pokemon"
        @click="onCardClick({ id, name })"
      >
        <div class="img-container">
          <img :src="getImgSrc(id)" :alt="name" />
        </div>
        <div class="info">
          <SaveMyPokeBtn :id="id" />
          <span class="number">{{ id.toString().padStart(3, '0') }}</span>
          <h3 class="name">{{ $t(`pokemonNames.${name}`) }}</h3>
        </div>
        <div class="types">
          <PokemonType v-for="type in types" :key="type" :type="type" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pokemonNames, pokeTypes, pokeTypeData } from '@/resource/pokemonData';
import routerPath from '@/libraries/routerPath';
import searchIcon from '@/assets/search.svg';
import PokemonType from '@/components/PokemonType.vue';
import SaveMyPokeBtn from '@/components/SaveMyPokeBtn.vue';

export default {
  name: 'PokemonList',
  components: { PokemonType, SaveMyPokeBtn },
  data() {
    return {
      assets: {
        searchIcon,
      },
      pokeTypes,
      searchKeyword: '',
      searchType: '',
    };
  },
  computed: {
    pokeData() {
      const keyword = this.searchKeyword.toLowerCase();
      if (this.searchType) {
        const data = pokeTypeData[this.searchType];
        if (keyword) {
          return data.filter(
            (item) =>
              item.name.includes(keyword) ||
              String(item.id).includes(keyword) ||
              this.$t(`pokemonNames.${item.name}`).includes(keyword)
          );
        }
        return data;
      }
      if (keyword) {
        return pokemonNames.filter(
          (item) =>
            item.name.includes(keyword) ||
            String(item.id).includes(keyword) ||
            this.$t(`pokemonNames.${item.name}`).includes(keyword)
        );
      }
      return pokemonNames;
    },
  },
  methods: {
    getImgSrc(id) {
      return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id
        .toString()
        .padStart(3, '0')}.png`;
    },
    onTypeChange(type) {
      this.searchType = this.searchType === type ? '' : type;
    },
    onCardClick({ id }) {
      this.$router.push(`${routerPath.DETAIL}?id=${id}`);
    },
    onReset() {
      this.searchKeyword = '';
      this.searchType = '';
    },
    onSearchValueChange(event) {
      this.searchKeyword = event.target.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.pokedex-list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 90px;
  .search-field {
    .form {
      display: flex;
      align-items: center;
      width: 100%;
    }
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    border: 1px solid #aaa;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.3);
    margin-bottom: 100px;
    width: 80%;
    position: relative;
    label {
      height: 34px;
      padding: 0 10px;
      background-color: #aaa;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px 0 0 3px;
      cursor: pointer;
      img {
        width: 20px;
        height: 20px;
        filter: invert(0.3);
      }
    }
    .keyword-input {
      width: 60%;
      height: 35px;
      padding: 10px;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 0 4px 4px 0;
      box-sizing: border-box;
    }
    .reset-btn {
      border: 1px solid #aaa;
      border-radius: 5px;
      margin-left: 10px;
      background-color: #ccc;
      padding: 7px 12px;
      text-align: center;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        background-color: #aaa;
      }
    }
    .poke-types {
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;
      > div {
        margin-bottom: 8px;
        cursor: pointer;
        opacity: 0.6;
        &.active {
          opacity: 1;
        }
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 20px;
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
  }
}
@media screen and (max-width: 530px) {
  .poke-types {
    justify-content: center;
    > div {
      flex-grow: 1;
    }
  }
}
</style>
