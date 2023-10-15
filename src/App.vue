<template>
  <NavBar />
  <router-view></router-view>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import HomePage from '@/pages/HomePage.vue';
import '@/stylesheets/app.scss';

export default {
  components: { NavBar, HomePage },
};
</script>

<style lang="scss" scoped></style>
