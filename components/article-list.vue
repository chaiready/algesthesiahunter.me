<template>
  <div class="article-list">
    <div v-for="(it, i) in article" :key="i" class="it">
      <div class="img-body">
        <NuxtLink
          :to="{
            path: pathLang(`/articles/${it._id}`, lang),
          }"
        >
          <img :data-src="cdn + it.img" class="lozad" />
        </NuxtLink>
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
            {{ it.createdAt | unixToCommonFilter }}
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
    <div v-if="article && article.length === 0" class="empty">
      空空如也
    </div>
    <MaskDialog v-model="show" v-if="mode" @submit="submit" title="编辑article">
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
    </MaskDialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import lozad from 'lozad'
export default {
  props: {
    article: {
      type: Array,
    },
  },
  data() {
    return {
      show: false,
      form: {
        tags: [],
      },
      current: null,
    }
  },
  mounted() {
    this.$nextTick(() => this.initData())
  },
  computed: {
    ...mapState('category', ['categorys']),
    ...mapState('tag', ['tags']),
    ...mapState('common', ['mode', 'lang']),
  },
  methods: {
    ...mapActions('article', [
      'getArticles',
      'deleteArticle',
      'putArticle',
      'getArticleDetail',
    ]),
    modeChange(it) {
      // 编辑
      this.show = true
      this.getArticleDetail(it._id).then((res) => {
        this.form = res
        this.current = res
      })
    },
    submit() {
      this.putArticle({
        id: this.current._id,
        params: this.form,
      }).then(() => this.init())
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
      this.show = false
      this.form = {
        tags: [],
      }
      this.current = null
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
    &:hover {
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
      img {
        height: 100%;
        width: 180px;
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
