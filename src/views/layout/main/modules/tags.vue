<template>
  <div class="category-container">
    <ul class="main">
      <li v-for="(it, i) in tags" :key="i">
        <router-link class="it" :to="'/tags/' + it.tag">
          <span class="svg-box"
            ><svg-icon :icon-class="it.tag" class="svg"></svg-icon
          ></span>
          <span class="text"
            >{{ $t(`tag.${it.tag}`) }} [{{ it.length }}]</span
          ></router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      tags: [],
    }
  },
  methods: {
    ...mapActions('common', ['getArticleByEveryTag']),
  },
  created() {
    this.getArticleByEveryTag().then(res => {
      let i = res.findIndex(v => v.tag === 'javascript')
      let v = res[i]
      res[i] = res[res.length - 1]
      res[res.length - 1] = v
      this.tags = res
    })
  },
}
</script>
<style lang="scss" scoped>
.category-container {
  width: 268px;
  padding: 0px 12px 12px 12px;
  background-color: $module-bg;
  overflow: hidden;
}
.main {
  display: flex;
  flex-wrap: wrap;
  .it {
    margin-top: 12px;
    margin-right: 8px;
    padding-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      .text {
        background-color: $module-hover-bg-darken-20;
      }
      .svg-box {
        background-color: $module-hover-bg;
      }
    }
    .svg-box {
      background-color: $module-hover-bg-opacity-3;
      width: 26px;
      font-size: 14px;
      height: 26px;
      line-height: 26px;
      display: inline-block;
      text-align: center;
    }
    .text {
      text-transform: capitalize;
      display: inline-block;
      height: 26px;
      line-height: 26px;
      padding: 0 7px;
      background-color: $module-hover-bg;
    }
  }
}
</style>
