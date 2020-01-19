<template>
  <div class="hot-container">
    <div class="title">
      <svg-icon icon-class="hot"></svg-icon>
      {{ $t('text.hot').toUpperCase() }}
    </div>
    <ul class="main">
      <li v-for="(it, i) in home" :key="i" class="it one-cut">
        <span
          :class="{
            index: true,
            fir: i === 0,
            sec: i === 1,
            thr: i === 2,
          }"
          >{{ i + 1 }}</span
        >
        <NuxtLink :to="pathLang('/articles/' + it._id, lang)" class="it-a">
          <span>{{ it.title }}</span>
        </NuxtLink>
      </li>
      <li
        v-for="(it, i) in 10 - home.length"
        :key="home.length + i"
        class="it one-cut"
      >
        <span
          :class="{
            index: true,
            fir: i + home.length === 0,
            sec: i + home.length === 1,
            thr: i + home.length === 2,
          }"
          >{{ i + home.length + 1 }}</span
        >
        <span>虚位以待......</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('article', ['home']),
    ...mapState('common', ['lang']),
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
