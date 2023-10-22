import * as cons from '@/constants/pokemon';
import axios from 'axios';

export const pokemon = {
  namespaced: true,
  state() {
    return {
      pokemonDetail: {
        basicInfo: {},
        species: {},
        abilities: {},
      },
      myPokeIds: [],
    };
  },
  mutations: {
    [cons.GET_POKEMON_DETAIL](state, { payload }) {
      state.pokemonDetail = payload;
    },
    [cons.UPDATE_MY_POKE_IDS](state, { payload }) {
      state.myPokeIds = payload;
    },
  },
  actions: {
    getPokemonDetail({ commit }, { id, cb }) {
      Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
      ])
        .then((response) => {
          const basicInfo = response[0]?.data || {};
          const species = response[1]?.data || {};
          const abilityUrl = basicInfo?.abilities[0]?.ability?.url;
          axios
            .get(abilityUrl)
            .then(({ data: { names: label, flavor_text_entries: desc } }) => {
              commit({
                type: cons.GET_POKEMON_DETAIL,
                payload: {
                  basicInfo,
                  species,
                  abilities: { label, desc },
                },
              });
            });
        })
        .finally(() => {
          cb();
        });
    },
    updateMyPokeIds({ commit, state }, id) {
      const saveId = String(id);
      const preState = state.myPokeIds;
      const payload = preState.includes(saveId)
        ? preState.filter((item) => item !== saveId)
        : [...preState, saveId];
      commit({
        type: cons.UPDATE_MY_POKE_IDS,
        payload,
      });
    },
  },
};
