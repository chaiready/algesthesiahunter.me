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
          :data-src="
            getImgUrl(img + '?x-oss-process=image/resize,m_lfit,w_600')
          "
          @click="addImgPopup(img)"
          alt
        />
      </div>
      <markdown :value="content"></markdown>
      <gitalk></gitalk>
    </template>
    <div v-else class="empty">空空如也</div>
  </div>
</template>

<script>
import lozad from 'lozad'
import markdown from '@/components/markdown.vue'
export default {
  name: 'Articles',
  components: {
    markdown,
    gitalk: () => import('@/components/gitalk.vue'),
  },
  data() {
    return {
      origin: null,
      img: null,
      content: null,
      title: null,
    }
  },
  head() {
    return {
      title: `${this.title} | Algesthesiahunter.top`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: this.des,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.tags.map((v) => v.name).toString(),
        },
      ],
    }
  },
  mounted() {
    const observer = lozad()
    observer.observe()
  },
  asyncData({ store, params }) {
    return store.dispatch('article/getArticleDetail', params.id)
  },
  methods: {
    addImgPopup(img) {
      if (window.utils) {
        const src = this.getImgUrl(img)
        window.utils.addImgPopup(src)
      }
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
      width: 108px;
      height: 54px;
      text-transform: uppercase;
      transform: rotate(-45deg);
      background-color: $green;
      position: absolute;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 18px;
      font-weight: bold;
      color: $text-reversal;
      left: -42px;
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
