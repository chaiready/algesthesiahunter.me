<template>
  <div class="article-list">
    <div class="it" v-for="(it, i) in viewList" :key="i">
      <div class="img-body">
        <router-link
          :to="{
            path: '/articles/' + it.date,
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
              path: '/articles/' + it.date,
            }"
          >
            {{ it.title }}
          </router-link>
        </h5>
        <p class="it-des more-cut">{{ it.des }}</p>
        <div class="it-meta">
          <div class="time">
            <svg-icon icon-class="calendar"></svg-icon>
            {{ it.date }}
          </div>
          <div class="category">
            <router-link :to="'/' + it.category">
              <svg-icon icon-class="category"></svg-icon>
              {{ $t(`nav.${it.category}`) }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="empty" v-if="viewList.length === 0">空空如也</div>
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
      viewList: [],
    }
  },
  computed: {
    ...mapState('common', ['sourceAttr']),
  },
  methods: {
    ...mapActions('common', [
      'getArticleByCategory',
      'getArticleByTag',
      'getArticleByKeyword',
    ]),
    lozadRender() {
      this.$nextTick(() => {
        const observer = lozad()
        observer.observe()
      })
    },
  },
  watch: {
    keyword: {
      handler(n) {
        if (n) {
          this.getArticleByKeyword(n).then(res => {
            this.viewList = res
            this.lozadRender()
          })
        }
      },
      immediate: true,
    },
    tag: {
      handler(n) {
        if (n) {
          this.getArticleByTag(n).then(res => {
            this.viewList = res
            this.lozadRender()
          })
        }
      },
      immediate: true,
    },
    category: {
      handler(n) {
        if (n) {
          this.getArticleByCategory(n).then(res => {
            this.viewList = res
            this.lozadRender()
          })
        }
      },
      immediate: true,
    },
  },
  created() {
    this.viewList = this.sourceAttr
    this.lozadRender()
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
    &:hover {
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
