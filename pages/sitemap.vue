<template>
  <div class="sitemap-page">
    <div class="sitemap">
      <div class="module articles">
        <h4 class="title">{{ $t('sitemap.articles') }}</h4>
        <p v-if="!data.length">空空如也</p>
        <ul v-else class="article-list">
          <li v-for="(it, i) in data" :key="i" class="item">
            <p class="item-content">
              <a
                class="link"
                :href="pathLang(`/articles/${it._id}`, lang)"
                target="_blank"
                :title="it.title"
              >
                <span class="sign">「</span>
                <span class="title">{{ it.title }}</span>
                <span class="sign">」</span>
              </a>
            </p>
          </li>
        </ul>
      </div>
      <div class="module tags">
        <h4 class="title">
          {{ $t('sitemap.tags') }}
        </h4>
        <p v-if="!tags.length">空空如也</p>
        <ul v-else class="tag-list">
          <li v-for="(it, i) in tags" :key="i" class="item">
            <a
              target="_blank"
              :href="pathLang('/tags/' + it.name + '?tags=' + it._id, lang)"
              :title="it.name"
            >
              {{ $t(`tag.${it.name}`) }}
            </a>
          </li>
        </ul>
      </div>
      <div class="module pages">
        <h4 class="title">{{ $t('sitemap.pages') }}</h4>
        <ul class="page-list">
          <li class="item">
            <a :href="pathLang('/', lang)" target="_blank">
              {{ navList.home }}</a
            >
          </li>
          <li class="item">
            <a :href="pathLang('/about', lang)" target="_blank">
              {{ navList.about }}</a
            >
          </li>
          <li class="item" v-for="(it, i) in categorys" :key="i">
            <a
              target="_blank"
              :href="pathLang(`/category/${it.name}?category=${it._id}`, lang)"
            >
              {{ $t(`nav.${it.name}`) }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      data: [],
    }
  },
  name: 'Sitemap',
  head() {
    return {
      title: 'Sitemap | Algesthesiahunter.top',
    }
  },
  asyncData({ store, query }) {
    return store.dispatch('article/getArticles', {
      page: 1,
      pageSize: 999,
    })
  },
  computed: {
    ...mapState('tag', ['tags']),
    ...mapState('category', ['categorys']),
    ...mapState('common', ['lang']),
    navList() {
      return this.$t('nav')
    },
  },
}
</script>

<style lang="scss" scoped>
.sitemap-page {
  width: 100%;
  padding: 30px;
  background-color: $module-bg;
  overflow: hidden;
  $border-guide: 1px solid;

  .sitemap {
    text-transform: capitalize;

    a {
      border-bottom: $border-guide;

      &.toggle-link {
        border: none;
      }
    }

    .module {
      margin-bottom: 10px;
      font-size: 1em;

      .title {
        font-weight: bold;
        text-transform: capitalize;
      }
    }

    .articles {
      .article-list {
        list-style: square;
        > .item {
          margin: 15px 0;
          > .item-content {
            margin-bottom: 1.2em;

            > .link {
              border: none;

              > .title {
                font-weight: normal;
                border-bottom: $border-guide;
              }
            }
          }

          > .item-description {
            line-height: 2em;
            padding-left: 1em;
          }
        }
      }
    }

    .tags,
    .pages {
      margin-bottom: 10px;

      .tag-list,
      .page-list {
        overflow: hidden;
        margin: 15px;

        .item {
          float: left;
          display: block;
          margin-right: 15px;
          margin-bottom: 15px;
        }
      }
    }
  }
}
</style>
