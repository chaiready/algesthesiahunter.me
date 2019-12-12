<template>
  <div class="hot-container">
    <div class="title">
      <svg-icon icon-class="hot"></svg-icon>
      {{ $t('text.hot').toUpperCase() }}
    </div>
    <ul class="main">
      <li class="it one-cut" v-for="(it, i) in hotList" :key="i">
        <span
          :class="{
            index: true,
            fir: i === 0,
            sec: i === 1,
            thr: i === 2,
          }"
          >{{ i + 1 }}</span
        >
        <router-link :to="'/articles/' + it.date" class="it-a">
          <span>{{ it.title }}</span>
        </router-link>
      </li>
      <li
        class="it one-cut"
        v-for="(it, i) in 10 - hotList.length"
        :key="hotList.length + i"
      >
        <span
          :class="{
            index: true,
            fir: i + hotList.length === 0,
            sec: i + hotList.length === 1,
            thr: i + hotList.length === 2,
          }"
          >{{ i + hotList.length + 1 }}</span
        >
        <span>虚位以待......</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      hotList: [],
    }
  },
  computed: {
    navList() {
      return this.$t('nav')
    },
    navListKey() {
      return this.$t('nav')
    },
    lang() {
      return this.$t('languages')
    },
  },
  methods: {
    ...mapActions('common', ['getArticleByHot']),
  },
  created() {
    this.getArticleByHot().then(res => (this.hotList = res.reverse()))
  },
}
</script>
<style lang="scss" scoped>
.hot-container {
  padding: 0px 12px 12px 12px;
  background-color: $module-bg;
  overflow: hidden;
  .title {
    display: flex;
    align-items: center;
    height: 42px;
    border-bottom: $border-dashed;
    font-weight: bold;
    font-size: 14px;
    svg {
      margin-right: 10px;
      font-size: 16px;
      color: #d81d05;
    }
  }
  .main {
    .it {
      margin-top: 10px;
      .it-a:hover {
        text-decoration: underline;
      }
      .index {
        width: 18px;
        height: 18px;
        display: inline-block;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        color: $text-secondary;
        background-color: $module-hover-bg;
        margin-right: 8px;
      }
      .fir {
        color: $text-reversal;
        background-color: $primary-opacity-5;
      }
      .sec {
        color: $text-reversal;
        background-color: rgba(76, 175, 80, 0.6);
      }
      .thr {
        color: $text-reversal;
        background-color: rgba(255, 87, 34, 0.6);
      }
    }
  }
}
</style>
