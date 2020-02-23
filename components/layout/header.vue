<template>
  <header ref="header" class="header-container">
    <div class="header">
      <NuxtLink :to="pathLang('/', lang)" class="header-main">
        <div class="logo-main">
          <svg-icon icon-class="logo" v-if="website"></svg-icon>
          <div ref="website" style="padding-left:8px">Algesthesiahunter</div>
        </div>
        <div class="header-slogan">{{ $t('text.slogan') }}</div>
      </NuxtLink>
      <div class="header-search">
        <svg-icon
          v-if="mode"
          @click="modeChange"
          icon-class="add.article"
          class="add"
        ></svg-icon>
        <svg-icon
          @click="switchMode"
          icon-class="search"
          class="search"
        ></svg-icon>
        <input
          v-model="keyword"
          @keyup.enter="seach"
          :placeholder="$t('text.search')"
          type="text"
        />
      </div>
    </div>
    <MaskDialog
      v-if="mode"
      v-model="show"
      @submit="submit"
      :title="type ? '添加文章' : '管理员登录'"
    >
      <div v-if="!type" class="form">
        <span>密码</span>
        <input
          v-focus
          v-model="password"
          @keyup.enter="submit"
          @click="() => {}"
          type="password"
          class="inp"
        />
      </div>
    </MaskDialog>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      type: false,
      keyword: '',
      show: false,
      website: false,
      password: null,
    }
  },
  computed: {
    ...mapState('common', ['token', 'mode', 'lang']),
  },
  methods: {
    ...mapActions('common', ['updateMode', 'login']),
    modeChange() {
      this.$router.push({
        path: '/edit',
      })
    },
    submit() {
      this.login(this.password).then(() => (this.show = !this.show))
    },
    switchMode() {
      if (this.token) {
        this.updateMode(!this.mode)
      }
    },
    popLogin() {
      this.show = true
      this.type = false
    },
    seach() {
      if (this.keyword === 'adminlogin') {
        this.popLogin()
        return false
      }
      const k = this.keyword.trim()
      if (k !== '' && this.$route.query.keyword !== k) {
        this.$router.push({
          path: '/search',
          query: {
            keyword: k,
          },
        })
      } else if (this.$route.name !== 'home') {
        this.$router.push({
          path: '/',
        })
      }
    },
  },
  mounted() {
    this.$refs.website.innerHTML = 'lgesthesiahunter'
    this.$refs.website.style.paddingLeft = 0
    this.website = true
  },
}
</script>

<style scoped lang="scss">
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  user-select: none;
  backdrop-filter: blur(5px);
  background-color: $module-bg;
  .header {
    width: 1250px;
    height: 60px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .header-main {
    color: $primary;
    display: flex;
    align-items: center;
    font-size: 25px;
    padding-left: 10px;
    .logo-main {
      display: flex;
      align-items: center;
      div {
        transition: none;
      }
    }
    .header-slogan {
      font-size: 14px;
      margin-left: 48px;
    }
  }
  .header-search {
    height: 60px;
    display: flex;
    align-items: center;
    opacity: 0.8;
    .search {
      font-size: 16px;
    }
    .add {
      margin-right: 20px;
      font-size: 40px;
      padding: 12px;
      cursor: pointer;
      &:hover {
        color: $primary;
      }
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
      -webkit-text-fill-color: $text !important;
      transition: background-color 5000s ease-in-out 0s;
    }
    input {
      height: 20px;
      font-size: 12px;
      color: $text;
      padding: 0 8px;
      background-color: transparent;
      &:focus {
        border-color: transparent !important;
      }
    }
  }
}

@keyframes logo-blink {
  0% {
    mask-position: -30%;
  }
  100% {
    mask-position: 666%;
  }
}
.logo-main {
  mask-size: 88%;
  mask-position: -30%;
  mask-image: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.2)
  );
  animation: logo-blink 6s ease-in 1s infinite;
}
</style>
