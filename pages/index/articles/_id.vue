<template>
  <div class="articles">
    <template v-if="content">
      <div class="title">
        <div
          :class="{ origin: true, other: origin != 'original' }"
          v-if="origin"
        >
          {{ $t(`text.origin.${origin}`) }}
        </div>
        <h2>{{ title }}</h2>
        <img
          class="lozad"
          :data-src="cdn + img"
          @click="addImgPopup(cdn + img)"
        />
      </div>
      <markdown :value="content"></markdown>
      <div id="gitalk-container"></div>
    </template>
    <div v-else class="empty">空空如也</div>
  </div>
</template>

<script>
import lozad from 'lozad'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import MD5 from 'crypto-js/md5'
import { rightTitle } from '@/utils/title'
import markdown from '@/components/markdown.vue'
export default {
  name: 'Articles',
  components: {
    markdown,
  },
  head() {
    return {
      title: `${this.title} | ${rightTitle}`,
    }
  },
  mounted() {
    this.$nextTick(() => {
      const observer = lozad()
      observer.observe()
      this.initGitalk()
    })
  },
  asyncData({ store, params }) {
    return store.dispatch('article/getArticleDetail', params.id)
  },
  methods: {
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
  padding-top: 30px;
  background-color: $module-bg;
  position: relative;
  overflow: hidden;
  .title {
    margin-bottom: 20px;
    .origin {
      transform: rotate(-45deg);
      background-color: $green;
      position: absolute;
      font-size: 12px;
      font-weight: bold;
      padding: 28px 38px;
      padding-bottom: 12px;
      color: $text-reversal;
      left: -36px;
      top: -12px;
    }
    .other {
      background-color: $red;
    }
    h2 {
      color: $md-title;
      margin-bottom: 1.3em;
      margin-top: 0;
      text-align: center;
      font-weight: 700;
      font-size: 18px;
    }
    img {
      height: 200px;
      cursor: pointer;
    }
  }
}
</style>
