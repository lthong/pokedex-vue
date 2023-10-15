<template>
  <div class="nav-bar">
    <div class="left-items">
      <router-link :to="routerPath.ROOT" exactActiveClass="active">{{
        $t('common.pokedex')
      }}</router-link>
    </div>
    <div class="right-items">
      <audio
        class="bgm-audit"
        ref="bmgRef"
        :src="assets.bgm"
        :muted="!isBgmOpen"
        :autoPlay="false"
        loop
        controls
      />
      <div class="bgm-switch" @click="onBgmStatusChange">
        <div class="voice-icon">
          <img
            v-if="isBgmOpen"
            :src="assets.voiceClosedIcon"
            alt="voice-closed"
          />
          <img v-else :src="assets.voiceOpenIcon" alt="voice-open" />
        </div>
        <div :class="['bgm-btn', { open: isBgmOpen }]">
          <div class="switch" />
        </div>
      </div>
      <div class="locale-selector">
        <img class="earth-icon" :src="assets.earthIcon" alt="earth-icon" />
        <select :value="$i18n.locale" @change="onLocaleChange">
          <option value="zh-TW">{{ $t('common.zh-TW') }}</option>
          <option value="en">{{ $t('common.en') }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import routerPath from '@/libraries/routerPath';
import bgm from '@/assets/bg.mp3';
import earthIcon from '@/assets/earth.svg';
import voiceClosedIcon from '@/assets/voice-open.svg';
import voiceOpenIcon from '@/assets/voice-closed.svg';

export default {
  name: 'NavBar',
  data() {
    return {
      assets: {
        bgm,
        earthIcon,
        voiceClosedIcon,
        voiceOpenIcon,
      },
      routerPath,
      isBgmOpen: false,
    };
  },
  methods: {
    onBgmStatusChange() {
      this.isBgmOpen = !this.isBgmOpen;
    },
    onLocaleChange(event) {
      const locale = event.target.value;
      this.$i18n.locale = locale;
    },
  },
  watch: {
    isBgmOpen() {
      if (this.isBgmOpen) {
        this.$refs.bmgRef.play();
      } else {
        this.$refs.bmgRef.pause();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$navBarColor: #464646;

.nav-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  background-color: $navBarColor;
  position: fixed;
  top: 0;
  padding: 0 20px;
  font-family: Verdana;
  z-index: 10;
  box-shadow: 0 2px 5px rgb(0 0 0 / 30%);
  .left-items {
    font-size: 1.2rem;
    white-space: nowrap;
  }
  .right-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
  }
  .bgm-audit {
    display: none;
  }
  .bgm-switch {
    display: flex;
    cursor: pointer;
    .voice-icon {
      margin-right: 5px;
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        filter: invert(1);
      }
    }
    .bgm-btn {
      position: relative;
      width: 40px;
      height: 20px;
      border-radius: 20px;
      background-color: #888;
      display: flex;
      align-items: center;
      margin-right: 20px;
      transition: 0.3s;
      .switch {
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background-color: white;
        transition: 0.3s;
        right: 22px;
      }
      &.open {
        .switch {
          background-color: #90caf9;
          right: 3.5px;
        }
      }
      &:hover {
        background-color: #999;
      }
    }
  }
  .locale-selector {
    display: flex;
    align-items: center;
    .earth-icon {
      width: 20px;
      height: 20px;
      filter: invert(1);
    }
    select {
      background-color: $navBarColor;
      color: white;
      border: 0;
      font-size: 14px;
      padding: 5px;
      cursor: pointer;
      position: relative;
      &:focus-visible {
        outline: 0;
      }
      &:hover {
        background-color: lighten($navBarColor, 10%);
        border-radius: 5px;
      }
    }
  }
  .github-icon {
    width: 25px;
    height: 25px;
    margin-left: 10px;
    filter: invert(1);
    cursor: pointer;
    &:hover {
      filter: invert(0.9);
    }
  }
  a {
    color: white;
    height: 50px;
    padding: 0 10px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
  }
  .active {
    color: rgb(248, 213, 148);
  }
  a:hover:not(.active) {
    color: rgb(248, 213, 148);
    background-color: darken($navBarColor, 10%);
  }
}
</style>
