<template>
  <img
    alt="save-my-poke-btn"
    :class="[
      'save-my-poke-btn',
      {
        active,
      },
    ]"
    :src="iconPath"
    @click="onImgClick"
  />
</template>

<script>
import redLoveIcon from '@/assets/red-love.svg';
import whiteLoveIcon from '@/assets/white-love.svg';
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    id: { type: [String, Number] },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('pokemon', ['myPokeIds']),
    active() {
      return this.myPokeIds.includes(String(this.id));
    },
    iconPath() {
      return this.active ? redLoveIcon : whiteLoveIcon;
    },
  },
  methods: {
    ...mapActions('pokemon', ['updateMyPokeIds']),
    onImgClick(event) {
      event.stopPropagation();
      this.updateMyPokeIds(this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.save-my-poke-btn {
  position: absolute;
  width: 30px;
  height: 30px;
  left: 90%;
  top: -20px;
  opacity: 0.6;
  cursor: pointer;
  &.active {
    opacity: 1;
  }
  &:hover:not(.active) {
    filter: invert(1);
  }
}
</style>
