<template>
  <div class="article-list">
    <div v-if="article && article.length === 0" class="empty">
      空空如也
    </div>
    <template v-else>
      <div v-for="(it, i) in article" :key="i" class="it">
        <div class="img-body">
          <NuxtLink
            :to="{
              path: pathLang(`/articles/${it._id}`, lang),
            }"
          >
            <img
              :data-src="
                getImgUrl(it.img + '?x-oss-process=image/resize,m_lfit,w_180')
              "
              alt
              class="lozad"
            />
          </NuxtLink>
          <div
            :class="{ origin: true, other: it.origin != 'original' }"
            v-if="it.origin"
          >
            {{ $t(`text.origin.${it.origin}`) }}
          </div>
        </div>
        <div class="it-body">
          <h5>
            <NuxtLink
              :to="{
                path: pathLang('/articles/' + it._id, lang),
              }"
              class="title one-cut"
            >
              {{ it.title }}
            </NuxtLink>
          </h5>
          <p class="it-des more-cut">{{ it.des }}</p>
          <div class="it-meta">
            <div class="time">
              <svg-icon icon-class="calendar"></svg-icon>
              {{ it.createdAt | unixToCommonFilter(lang) }}
            </div>
            <div class="category">
              <NuxtLink
                :to="{
                  path: pathLang(
                    '/category/' +
                      it.category.name +
                      '?category=' +
                      it.category._id,
                    lang
                  ),
                }"
              >
                <svg-icon icon-class="category"></svg-icon>
                {{ $t(`nav.${it.category.name}`) }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <operating
          v-if="mode"
          :it="it"
          @edit="modeChange(it)"
          @ConfirmSubmit="ConfirmSubmit"
          class="operating"
        ></operating>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import lozad from 'lozad'
export default {
  name: 'ArticleList',
  props: {
    article: {
      type: Array,
    },
  },
  mounted() {
    this.$nextTick(() => this.initData())
  },
  computed: {
    ...mapState('common', ['mode', 'lang']),
  },
  methods: {
    ...mapActions('article', ['getArticles', 'deleteArticle']),
    modeChange(it) {
      this.$router.push({
        path: '/edit',
        query: {
          id: it._id,
        },
      })
    },
    lozadRender() {
      this.$nextTick(() => {
        const observer = lozad()
        observer.observe()
      })
    },
    ConfirmSubmit(id) {
      this.deleteArticle(id).then(() => this.init())
    },
    initData() {
      this.lozadRender()
    },
    init() {
      const { page, keyword, category, tags } = this.$route.query
      this.getArticles({
        page,
        keyword,
        category,
        tags,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.article-list {
  .it {
    background-color: $module-bg;
    margin-bottom: 14px;
    padding: 7px;
    display: flex;
    overflow: hidden;
    position: relative;
    transition: all 0.25s linear;
    &:hover {
      .origin {
        opacity: 1 !important;
      }
      .operating {
        visibility: visible;
        opacity: 1;
      }
      background-color: $module-hover-bg;
      img {
        transform: translateX(-3px);
        opacity: 0.95;
      }
    }
    .img-body {
      width: 170px;
      height: 120px;
      display: flex;
      overflow: hidden;
      flex-shrink: 0;
      position: relative;
      img {
        height: 100%;
        width: 180px;
      }
      .origin {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0.6;
        color: $text-reversal;
        padding: 6px 8px;
        background-color: $green;
        text-transform: uppercase;
      }
      .other {
        background-color: $red;
      }
    }
    .it-body {
      flex-shrink: 0;
      margin-left: 15px;
      margin-right: 5px;
      flex: 1;
      width: 438px;
      display: flex;
      flex-direction: column;
      .title {
        display: inline-block;
        &:hover {
          margin-left: 7px;
          text-decoration: underline;
        }
      }
      .it-des {
        flex: 1;
        margin-top: 7px;
        margin-bottom: 4px;
      }
      .it-meta {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        .time {
          text-transform: uppercase;
        }
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          svg {
            font-size: 14px;
            margin-right: 5px;
          }
        }
        .category {
          text-transform: capitalize;
        }
      }
    }
  }
}
</style>
