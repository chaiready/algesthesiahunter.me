<template>
  <div class="article-list">
    <div class="it" v-for="(it, i) in sourceDate" :key="i">
      <div class="img-body">
        <router-link to="/">
          <img src="@/assets/imgs/img0.jpeg" />
        </router-link>
      </div>
      <div class="it-body">
        <h5>
          <router-link
            class="title one-cut"
            :to="{
              path: '/articles/' + it.attributes.date,
            }"
          >
            {{ it.attributes.title }}
          </router-link>
        </h5>
        <p class="it-des more-cut">{{ it.attributes.des }}</p>
        <div class="it-meta">
          <div class="time">{{ it.attributes.date }}</div>
          <div class="category">{{ $t(`nav.${it.attributes.category}`) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sourceDate } from '@/service/articies'
export default {
  data() {
    return {
      sourceDate,
    }
  },
  computed: {},
  methods: {},
  mounted() {},
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
    }
    .img-body {
      width: 170px;
      height: 120px;
      display: flex;
      flex-shrink: 0;
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
        width: 100%;
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
      }
    }
  }
}
</style>
