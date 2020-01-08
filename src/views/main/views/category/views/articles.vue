<template>
  <div class="articles">
    <template v-if="article && article.content">
      <div class="title">
        <h2>{{ article.title }}</h2>
        <img
          class="lozad"
          :data-src="cdn + article.img"
          @click="addImgPopup(cdn + article.img)"
        />
      </div>
      <markdown :value="article.content"></markdown>
      <div id="gitalk-container"></div>
    </template>
    <div v-else class="empty">空空如也</div>
  </div>
</template>

<script>
import markdown from '@/components/common/markdown.vue'
import lozad from 'lozad'
import { mapActions } from 'vuex'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import MD5 from 'crypto-js/md5'
import { rightTitle } from 'utils/title'
export default {
  name: 'articles',
  data() {
    return {
      article: {},
    }
  },
  components: {
    markdown,
  },
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  watch: {
    id: {
      handler(n) {
        this.getArticleDetail(n).then(res => {
          this.article = res
          document.title = ` ${res.title} | ${rightTitle} `
          this.$nextTick(() => {
            const observer = lozad()
            observer.observe()
            this.initGitalk()
          })
        })
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions('article', ['getArticleDetail']),
    addImgPopup(src) {
      if (window.utils) {
        window.utils.addImgPopup(src)
      }
    },
    initGitalk() {
      const gitalk = new Gitalk({
        clientID: '06b5cef9988469ced515',
        clientSecret: '023eace06a9416b02f69ad2dd81dd7969a660aa5',
        repo: 'gitalk.algesthesiahunter',
        owner: 'Algesthesiahunter',
        admin: ['Algesthesiahunter'],
        id: MD5(this.$route.fullPath).toString(),
        distractionFreeMode: false, // Facebook-like distraction free mode
      })
      gitalk.render('gitalk-container')
    },
  },
}
</script>
<style lang="scss" scoped>
.articles {
  padding: 12px 24px;
  background-color: $module-bg;
  .title {
    h2 {
      margin: 1em 0 1.5em;
      text-align: center;
      font-weight: 700;
      font-size: 19.285px;
    }
    img {
      height: 200px;
      cursor: pointer;
    }
  }
}
</style>
