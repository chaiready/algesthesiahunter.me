<template>
  <div class="tool-container">
    <div class="theme cu-p de" @click="changeToRed(theme)" title="Switch theme">
      <svg-icon :icon-class="themeNext"></svg-icon>
    </div>
    <div :class="langClass" @click="switchLang" title="Switch language">
      <span class="lang-box">{{ langNext }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('common', ['theme', 'lang']),
    langClass() {
      const str = 'lang cu-p us-n '
      return str + this.lang
    },
    themeNext() {
      let theme
      if (this.theme === 'default') {
        theme = 'dark'
      } else {
        theme = 'default'
      }
      return theme
    },
    langNext() {
      let lang
      if (this.lang === 'en') {
        lang = 'zh'
      } else {
        lang = 'en'
      }
      return lang
    },
  },
  methods: {
    ...mapActions('common', ['updateLang', 'updateTheme']),
    changeToRed() {
      let theme
      if (this.theme === 'default') {
        theme = 'dark'
      } else {
        theme = 'default'
      }
      this.updateTheme(theme)
    },
    switchLang() {
      let lang
      if (this.lang === 'en') {
        lang = 'zh'
      } else {
        lang = 'en'
      }
      const path = this.$route.fullPath
      let newPath
      if (/^\/en\//.test(path)) {
        newPath = path.replace(/^\/en\//, `/`)
      } else {
        newPath = `/${lang}${path}`
      }
      this.$router.push({
        path: newPath,
      })
      this.updateLang(lang)
    },
  },
}
</script>

<style scoped lang="scss">
.tool-container {
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  right: 1px;
  bottom: 60px;
  .lang {
    width: 36px;
    height: 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
    background-color: $module-bg;
    font-weight: bold;
    font-size: 12px;
    &:hover {
      background-color: $module-hover-bg;
    }
    .lang-box {
      border: 1px solid $text-secondary;
      padding: 2px;
      border-radius: 3px;
    }
  }
  .theme {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $module-bg;
    font-size: 20px;
    &:hover {
      background-color: $module-hover-bg;
    }
  }
}
</style>
