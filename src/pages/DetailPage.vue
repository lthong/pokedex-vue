<template>
  <div class="pokedex-detail">
    <template v-if="!loading && String(basicInfo.id) === id">
      <div class="title">
        <div class="name">{{ $t(`pokemonNames.${name}`) }}</div>
        <div class="id">{{ `#${formatPokeId}` }}</div>
      </div>
      <div :class="['pokemon', { [mainType]: !!mainType }]">
        <img
          key="prePokeDetailBtn"
          :class="['arrow-btn left', { disabled: preBtnDisabled }]"
          :src="assets.arrowIcon"
          alt="arrow-icon"
          @click="onArrowBtnClick('pre')"
        />
        <div class="data-box">
          <div class="block">
            <SaveMyPokeBtn :id="id" />
            <div class="img-container">
              <img
                class="poke-photo"
                :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatPokeId}.png`"
                :alt="name"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-1-1">
              <div class="label">{{ $t('common.states') }}</div>
              <div class="content">
                <div
                  v-for="({ label, value }, index) in states"
                  :key="`state-${index}`"
                  class="state"
                >
                  <div class="label">{{ $t(`common.${label}`) }}</div>
                  <div class="value">
                    <div
                      :class="['bar', { full: getBarWidth(value) === 100 }]"
                      :style="
                        isStatesBarReady
                          ? { width: `${getBarWidth(value)}%` }
                          : {}
                      "
                    />
                    <span>{{ `${value} / 300` }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="data-box">
          <div class="row">
            <div class="col-1-2">
              <div class="label">{{ $t('common.height') }}</div>
              <div class="content">
                {{ `${decimal.div(basicInfo.height, 10).toNumber()}m` }}
              </div>
            </div>
            <div class="col-1-2">
              <div class="label">{{ $t('common.weight') }}</div>
              <div class="content">
                {{ `${decimal.div(basicInfo.weight, 10).toNumber()}kg` }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1-1">
              <div class="label">{{ $t('common.types') }}</div>
              <div class="content">
                <PokemonType
                  v-for="(item) in basicInfo.types"
                  :key="item.type.name"
                  :type="item.type.name"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1-1">
              <div class="label">{{ $t('common.category') }}</div>
              <div class="content">{{ category }}</div>
              <div class="content desc">{{ desc }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-1-1">
              <div class="label">{{ $t('common.ability') }}</div>
              <div class="content">{{ ability.label }}</div>
              <div class="content desc">{{ ability.desc }}</div>
            </div>
          </div>
        </div>
        <img
          key="nextPokeDetailBtn"
          :class="['arrow-btn right', { disabled: nextBtnDisabled }]"
          :src="assets.arrowIcon"
          alt="arrow-icon"
          @click="onArrowBtnClick('next')"
        />
      </div>
    </template>
    <div v-else class="pokemon">{{ $t('common.loading') }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import decimal from 'decimal.js';
import arrowIcon from '@/assets/arrow.svg';
import routerPath from '@/libraries/routerPath';
import { POKEMON_MAX_AMOUNT } from '@/libraries/constants';
import SaveMyPokeBtn from '@/components/SaveMyPokeBtn.vue';
import PokemonType from '@/components/PokemonType.vue';

const languageEnum = {
  en: 'en',
  'zh-Hant': 'zh-TW',
};

export default {
  name: 'DetailPage',
  components: {
    SaveMyPokeBtn,
    PokemonType,
  },
  data() {
    window.vm = this;
    return {
      decimal,
      assets: {
        arrowIcon,
      },
      id: this.$route.query.id,
      statesBarReadyTimerId: null,
      loading: false,
      isStatesBarReady: false,
    };
  },
  computed: {
    ...mapState('pokemon', ['pokemonDetail']),
    basicInfo() {
      return this.pokemonDetail.basicInfo;
    },
    species() {
      return this.pokemonDetail.species;
    },
    abilities() {
      return this.pokemonDetail.abilities;
    },
    name() {
      return this.basicInfo.name;
    },
    formatPokeId() {
      return this.id.toString().padStart(3, '0');
    },
    mainType() {
      return this.basicInfo.types[0].type.name;
    },
    category() {
      return this.species.genera?.filter(
        (item) => languageEnum[item.language.name] === this.$i18n.locale
      )[0]?.genus;
    },
    desc() {
      return this.species['flavor_text_entries']?.filter(
        (item) => languageEnum[item.language.name] === this.$i18n.locale
      )[0]?.['flavor_text'];
    },
    ability() {
      return this.abilities.desc && this.abilities.label
        ? {
            desc: this.abilities.desc.filter(
              (item) => languageEnum[item.language.name] === this.$i18n.locale
            )[0]?.['flavor_text'],
            label: this.abilities.label.filter(
              (item) => languageEnum[item.language.name] === this.$i18n.locale
            )[0]?.name,
          }
        : {};
    },
    states() {
      return this.basicInfo.stats?.map((item) => ({
        label: item.stat.name,
        value: item.base_stat,
      }));
    },
    preBtnDisabled() {
      return Number(this.id) - 1 <= 0;
    },
    nextBtnDisabled() {
      return Number(this.id) + 1 > POKEMON_MAX_AMOUNT;
    },
  },
  methods: {
    ...mapActions('pokemon', ['getPokemonDetail']),
    getData() {
      this.loading = true;
      this.isStatesBarReady = false;
      clearTimeout(this.statesBarReadyTimerId);

      this.getPokemonDetail({
        id: this.id,
        cb: () => {
          this.loading = false;
          this.statesBarReadyTimerId = setTimeout(() => {
            this.isStatesBarReady = true;
          }, 600);
        },
      });
    },
    getBarWidth(value) {
      return decimal.div(value, 300).mul(100).toNumber();
    },
    goToOtherPokeDetail(btnType) {
      const { $router, id } = this;
      const newId = btnType === 'pre' ? Number(id) - 1 : Number(id) + 1;
      this.id = String(newId);
      $router.push(`${routerPath.DETAIL}?id=${newId}`);
    },
    onArrowBtnClick(btnType) {
      if (btnType === 'pre') {
        !this.preBtnDisabled && this.goToOtherPokeDetail('pre');
      } else {
        !this.nextBtnDisabled && this.goToOtherPokeDetail('next');
      }
    },
  },
  created() {
    // vue router 在 query 更新後由於是同個組件所以不會重新渲染，故監聽 id 變化重新取得資料
    this.$watch(
      () => this.id,
      function () {
        this.getData();
      },
      { immediate: true }
    );
  },
  unmounted() {
    clearTimeout(this.statesBarReadyTimerId);
  },
};
</script>

<style lang="scss" scoped>
@import '../stylesheets/variable.scss';

.pokedex-detail {
  padding-top: 60px;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    .name {
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 1px;
      margin-right: 10px;
      color: #464646;
      &:first-letter {
        text-transform: uppercase;
      }
    }
    .id {
      font-size: 16px;
      color: #aaa;
    }
  }
  .pokemon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    &.fire {
      .img-container {
        background-color: lighten($color: $fireTypeColor, $amount: 30%);
        border: 3px solid $fireTypeColor;
      }
    }
    &.grass {
      .img-container {
        background-color: lighten($color: $grassTypeColor, $amount: 40%);
        border: 3px solid $grassTypeColor;
      }
    }
    &.electric {
      .img-container {
        background-color: lighten($color: $electricTypeColor, $amount: 30%);
        border: 3px solid $electricTypeColor;
      }
    }
    &.water {
      .img-container {
        background-color: lighten($color: $waterTypeColor, $amount: 30%);
        border: 3px solid $waterTypeColor;
      }
    }
    &.ground {
      .img-container {
        background-color: lighten($color: $groundTypeColor, $amount: 10%);
        border: 3px solid $groundTypeColor;
      }
    }
    &.rock {
      .img-container {
        background-color: lighten($color: $rockTypeColor, $amount: 30%);
        border: 3px solid $rockTypeColor;
      }
    }
    &.fairy {
      .img-container {
        background-color: lighten($color: $fairyTypeColor, $amount: 10%);
        border: 3px solid $fairyTypeColor;
      }
    }
    &.poison {
      .img-container {
        background-color: lighten($color: $poisonTypeColor, $amount: 10%);
        border: 3px solid $poisonTypeColor;
      }
    }
    &.bug {
      .img-container {
        background-color: lighten($color: $bugTypeColor, $amount: 30%);
        border: 3px solid $bugTypeColor;
      }
    }
    &.dragon {
      .img-container {
        background-color: lighten($color: $dragonTypeColor, $amount: 10%);
        border: 3px solid $dragonTypeColor;
      }
    }
    &.psychic {
      .img-container {
        background-color: lighten($color: $psychicTypeColor, $amount: 10%);
        border: 3px solid $psychicTypeColor;
      }
    }
    &.flying {
      .img-container {
        background-color: lighten($color: $flyingTypeColor, $amount: 10%);
        border: 3px solid $flyingTypeColor;
      }
    }
    &.fighting {
      .img-container {
        background-color: lighten($color: $fightingTypeColor, $amount: 30%);
        border: 3px solid $fightingTypeColor;
      }
    }
    &.normal {
      .img-container {
        background-color: lighten($color: $normalTypeColor, $amount: 30%);
        border: 3px solid $normalTypeColor;
      }
    }
    &.ice {
      .img-container {
        background-color: lighten($color: $iceTypeColor, $amount: 30%);
        border: 3px solid $iceTypeColor;
      }
    }
    &.ghost {
      .img-container {
        background-color: lighten($color: $ghostTypeColor, $amount: 10%);
        border: 3px solid $ghostTypeColor;
      }
    }
    &.steel {
      .img-container {
        background-color: lighten($color: $steelTypeColor, $amount: 10%);
        border: 3px solid $steelTypeColor;
      }
    }
    &.dark {
      .img-container {
        background-color: lighten($color: $darkTypeColor, $amount: 30%);
        border: 3px solid $darkTypeColor;
      }
    }
    .data-box {
      width: 300px;
      min-height: 450px;
      margin: 5px 10px 30px;
      border: 1px solid #aaa;
      border-radius: 10px;
      padding: 20px 15px;
      background-color: rgba(255, 255, 255, 0.3);
      box-shadow: 3px 3px 10px #ccc;
      .block {
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .save-my-poke-btn {
          top: -10px;
        }
        .img-container {
          width: 150px;
          height: 150px;
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .poke-photo {
            width: 90%;
            height: 90%;
            border-radius: 100%;
          }
        }
      }
      .row {
        display: flex;
        margin-bottom: 10px;
        .col-1-2 {
          width: 45%;
        }
        .col-1-1 {
          width: 100%;
        }
      }
      .label {
        font-size: 15px;
        font-weight: 500;
        color: rgb(25, 10, 155, 0.8);
        &:first-letter {
          text-transform: uppercase;
        }
      }
      .content {
        width: 90%;
        margin: 8px 0 8px 10px;
        display: flex;
        flex-wrap: wrap;
        font-size: 14px;
        color: #555;
        white-space: nowrap;
        &.desc {
          white-space: normal;
          line-height: 1.5;
          text-align: justify;
        }
        .state {
          width: 100%;
          display: flex;
          align-items: center;
          margin: 5px 0;
          .label {
            font-size: 12px;
            width: 40%;
            display: flex;
            align-items: center;
          }
          .value {
            position: relative;
            font-size: 10px;
            margin-left: 5%;
            border-radius: 8px;
            width: 55%;
            box-shadow: 3px 3px 5px #ddd;
            box-sizing: border-box;
            border: 1px solid #777;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 3px 0;
            background-color: transparent;
            span {
              z-index: 1;
            }
            .bar {
              position: absolute;
              left: 0;
              opacity: 0.6;
              height: 101%;
              border-radius: 8px 0 0 8px;
              box-sizing: border-box;
              width: 0;
              transition: width 0.5s;
              &.full {
                border-radius: inherit;
              }
            }
          }
          &:nth-child(1) .bar {
            background-color: #fd5959;
          }
          &:nth-child(2) .bar {
            background-color: #ffb641;
          }
          &:nth-child(3) .bar {
            background-color: #35be16;
          }
          &:nth-child(4) .bar {
            background-color: #03b2f7;
          }
          &:nth-child(5) .bar {
            background-color: #4c89de;
          }
          &:nth-child(6) .bar {
            background-color: #8943de;
          }
        }
      }
    }
    .arrow-btn {
      width: 35px;
      height: 35px;
      filter: invert(0.6);
      cursor: pointer;
      &:hover:not(.disabled) {
        filter: invert(0.3);
      }
      &.left {
        margin-right: 20px;
        transform: rotateY(180deg);
      }
      &.right {
        margin-left: 20px;
      }
      &.disabled {
        cursor: not-allowed;
      }
    }
  }
}
@media only screen and (max-width: 530px) {
  .pokedex-detail {
    position: relative;
    .pokemon {
      flex-wrap: wrap;
      .arrow-btn {
        position: absolute;
        top: 45vh;
        &.left {
          left: 3px;
        }
        &.right {
          right: 3px;
        }
      }
      .data-box {
        &:nth-child(3) {
          margin-bottom: 50px;
        }
      }
    }
  }
}
</style>
