<template>
  <div class="article-list">
    <div class="it" v-for="(it, i) in viewList.data" :key="i">
      <div class="img-body">
        <router-link
          :to="{
            path: '/articles/' + it._id,
          }"
        >
          <img class="lozad" :data-src="cdn + it.img" />
        </router-link>
      </div>
      <div class="it-body">
        <h5>
          <router-link
            class="title one-cut"
            :to="{
              path: '/articles/' + it._id,
            }"
          >
            {{ it.title }}
          </router-link>
        </h5>
        <p class="it-des more-cut">{{ it.des }}</p>
        <div class="it-meta">
          <div class="time">
            <svg-icon icon-class="calendar"></svg-icon>
            {{ it.createdAt | unixToCommonFilter }}
          </div>
          <div class="category">
            <router-link :to="'/' + getCategorysName(it.category)">
              <svg-icon icon-class="category"></svg-icon>
              {{ $t(`nav.${getCategorysName(it.category)}`) }}</router-link
            >
          </div>
        </div>
      </div>
      <operating
        v-if="mode"
        :it="it"
        class="operating"
        @edit="modeChange(it)"
        @ConfirmSubmit="ConfirmSubmit"
      ></operating>
    </div>
    <div class="empty" v-if="viewList.data && viewList.data.length === 0">
      空空如也
    </div>
    <MaskDialog v-model="show" title="编辑article" @submit="submit">
      <div class="form">
        <span>标题</span>
        <input type="text" class="inp" v-focus v-model="form.title" />
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
              type="checkbox"
              :id="it._id"
              :value="it._id"
              v-model="form.tags"
            />
            <label :for="it._id">{{ it.name }}</label>
          </div>
        </div>
      </div>
      <div class="form">
        <span>图片</span>
        <input type="text" class="inp" v-model="form.img" />
      </div>
      <div class="form">
        <span>描述</span>
        <textarea rows="2" type="text" class="inp" v-model="form.des" />
      </div>
      <div class="form">
        <span>内容</span>
        <textarea rows="5" type="text" class="inp" v-model="form.content" />
      </div>
    </MaskDialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import lozad from 'lozad'
export default {
  props: {
    category: {
      type: String,
    },
    tag: {
      type: String,
    },
    keyword: {
      type: String,
    },
  },
  data() {
    return {
      viewList: {
        data: [],
      },
      show: false,
      form: {
        tags: [],
      },
      current: null,
      page: {
        requestPage: 1,
        limit: 20,
      },
      password: null,
    }
  },
  computed: {
    ...mapState('category', ['categorys']),
    ...mapState('tag', ['tags']),
    ...mapState('common', ['mode']),
    categoryId() {
      let categoryId
      for (let i = 0; i < this.categorys.length; i++) {
        const v = this.categorys[i]
        if (v.name === this.category) {
          categoryId = v._id
          break
        }
      }
      return categoryId
    },
    tagId() {
      let tagId
      for (let i = 0; i < this.tags.length; i++) {
        const v = this.tags[i]
        if (v.name === this.tag) {
          tagId = v._id
          break
        }
      }
      return tagId
    },
  },
  methods: {
    ...mapActions('article', ['getArticles', 'deleteArticle', 'putArticle']),
    ...mapActions('common', [
      'getArticleByCategory',
      'getArticleByTag',
      'getArticleByKeyword',
    ]),
    modeChange(it) {
      //编辑
      this.show = true
      this.form = it
      this.current = it
    },
    submit() {
      this.putArticle({
        id: this.current._id,
        params: this.form,
      }).then(() => this.init())
    },
    getCategorysName(id) {
      let name
      for (let i = 0; i < this.categorys.length; i++) {
        const v = this.categorys[i]
        if (v._id === id) {
          name = v.name
          break
        }
      }
      return name
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
      this.getArticles({
        requestPage: this.page.requestPage,
        limit: this.page.limit,
        keyword: this.keyword,
        category: this.categoryId,
        tags: this.tagId,
      }).then(res => {
        this.viewList = res
        this.initData()
      })
    },
  },
  watch: {
    keyword: {
      handler(n) {
        if (n) {
          this.init()
        }
      },
    },
    tag: {
      handler(n) {
        if (n) {
          this.init()
        }
      },
    },
    category: {
      handler(n) {
        if (n) {
          this.init()
        }
      },
    },
  },
  created() {
    this.init()
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
