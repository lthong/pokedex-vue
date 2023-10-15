import * as cons from '@/constants/pokemon';

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
    updateMyPokeIds({ commit, state }, id) {
      const preState = state.myPokeIds;
      const payload = preState.includes(id)
        ? preState.filter((item) => item !== id)
        : [...preState, id];
      commit(cons.UPDATE_MY_POKE_IDS, { payload });
    },
  },
};
