<template>
  <header ref="header" class="header-container">
    <div class="header">
      <NuxtLink to="/" class="header-main">
        <div class="logo-main">
          <svg-icon icon-class="logo"></svg-icon>
          <div>lgesthesiahunter</div>
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
      v-model="show"
      @submit="submit"
      :title="type ? '添加文章' : '管理员登录'"
    >
      <template v-if="type">
        <div class="form">
          <span>标题</span>
          <input v-focus v-model="form.title" type="text" class="inp" />
        </div>
        <div class="form">
          <span>分类</span>
          <select v-model="form.category">
            <option v-for="(it, i) in categorys" :key="i" :value="it._id">{{
              it.name
            }}</option>
          </select>
        </div>
        <div class="form">
          <span>标签</span>
          <div class="checkbox-box">
            <div v-for="(it, i) in tags" :key="i" class="item">
              <input
                :id="it._id"
                :value="it._id"
                v-model="form.tags"
                type="checkbox"
              />
              <label :for="it._id">{{ it.name }}</label>
            </div>
          </div>
        </div>
        <div class="form">
          <span>图片</span>
          <input v-model="form.img" type="text" class="inp" />
        </div>
        <div class="form">
          <span>描述</span>
          <textarea v-model="form.des" rows="2" type="text" class="inp" />
        </div>
        <div class="form">
          <span>内容</span>
          <textarea v-model="form.content" rows="5" type="text" class="inp" />
        </div>
      </template>
      <div v-else class="form">
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
  data() {
    return {
      type: false,
      keyword: '',
      show: false,
      password: null,
      form: {
        tags: [],
      },
    }
  },
  computed: {
    ...mapState('tag', ['tags']),
    ...mapState('category', ['categorys']),
    ...mapState('common', ['token', 'mode']),
  },
  methods: {
    ...mapActions('common', ['updateMode', 'login']),
    ...mapActions('article', ['postArticle']),
    modeChange() {
      this.show = true
      this.type = true
      this.form = {
        tags: [],
      }
    },
    add() {
      this.postArticle(this.form).then(
        () =>
          (this.form = {
            tags: [],
          })
      )
    },
    submit() {
      if (this.type) {
        // 新增
        this.add()
        return false
      }
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
    const num = (() => {
      let l = 0
      let start = new Date().getTime()

      const addl = () => {
        const now = new Date().getTime()
        if (now - start <= 1000) {
          l += 1
          if (l === 2) {
            l = 0
            start = new Date().getTime()
            return true
          }
        } else {
          l = 0
          start = new Date().getTime()
        }
      }
      return {
        add() {
          return addl()
        },
      }
    })()
    document.onkeydown = (event) => {
      const e = event || window.event
      if (e && e.keyCode === 76) {
        if (num.add()) {
          this.popLogin()
        }
      }
    }
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
