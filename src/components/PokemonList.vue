<template>
  <div class="pokedex-list">
    <div class="search-field">
      <div class="form">
        <label for="keyword">
          <img :src="assets.searchIcon" alt="search-icon" />
        </label>
        <input id="keyword" class="keyword-input" :value="searchKeyword" @input="onSearchValueChange"
          :placeholder="$t('common.search_placeholder')" />
        <div class="reset-btn" @click="onReset">
          {{ $t('common.reset') }}
        </div>
      </div>
      <div class="poke-types">
        <PokemonType v-for="type in pokeTypes" :key="type" :type="type" :class="{ active: type === searchType }"
          @onTypeChange="onTypeChange" />
      </div>
    </div>
    <div class="content">
      <PokemonListItem v-for="item in pokeData" :key="item.id" v-bind="item" @onCardClick="onCardClick" />
    </div>
  </div>
</template>

<script>
import { pokemonNames, pokeTypes, pokeTypeData } from '@/resource/pokemonData';
import routerPath from '@/libraries/routerPath';
import searchIcon from '@/assets/search.svg';
import PokemonType from '@/components/PokemonType.vue';
import PokemonListItem from '@/components/PokemonListItem.vue';

export default {
  name: 'PokemonList',
  components: {
    PokemonType,
    PokemonListItem,
  },
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

      >div {
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
  }
}

@media screen and (max-width: 530px) {
  .poke-types {
    justify-content: center;

    >div {
      flex-grow: 1;
    }
  }
}
</style>
