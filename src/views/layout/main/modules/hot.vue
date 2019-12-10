<template>
  <div class="hot-container">
    <div class="title">
      <svg-icon icon-class="hot"></svg-icon>
      {{ $t('text.hot').toUpperCase() }}
    </div>
    <ul class="main">
      <li class="it one-cut">
        <span class="index fir">1</span>
        <span>虚位以待</span>
      </li>
      <li class="it ">
        <span class="index sec">2</span>
        <span>虚位以待</span>
      </li>
      <li class="it ">
        <span class="index thr">3</span>
        <span>虚位以待</span>
      </li>
      <li class="it ">
        <span class="index">4</span>
        <span>虚位以待</span>
      </li>
      <li class="it ">
        <span class="index">5</span>
        <span>虚位以待</span>
      </li>
      <li class="it ">
        <span class="index">6</span>
        <span>虚位以待</span>
      </li>
      <li class="it ">
        <span class="index">7</span>
        <span>虚位以待</span>
      </li>
      <li class="it ">
        <span class="index">8</span>
        <span>虚位以待</span>
      </li>
      <li class="it ">
        <span class="index">9</span>
        <span>虚位以待</span>
      </li>
      <li class="it ">
        <span class="index">10</span>
        <span>虚位以待</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
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
    switchLang() {
      if (this.lang === 'EN') {
        this.$i18n.locale = 'zh'
      } else {
        this.$i18n.locale = 'en'
      }
      localStorage.lang = this.$i18n.locale
    },
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
