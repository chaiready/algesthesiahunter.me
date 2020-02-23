<!--
 * @Description:分页组件
 * @author: <https://github.com/algesthesiahunter>
 -->
<template>
  <div class="paginations">
    <NuxtLink :class="{ pre: true, disable: preDisable }" :to="pre">
      <svg-icon icon-class="light"></svg-icon>Hikari
    </NuxtLink>
    <div class="mid">百炼成钢绕指柔</div>
    <NuxtLink :class="{ next: true, disable: NextDisable }" :to="next">
      Homura<svg-icon icon-class="fire"></svg-icon>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'Paginations',
  props: {
    value: {},
    total: {
      default: 0,
    },
  },
  computed: {
    page() {
      return this.$route.query.page || 1
    },
    preDisable() {
      const i = this.page
      if (i && i !== 1) {
        return false
      } else {
        return true
      }
    },
    NextDisable() {
      if (this.total <= this.page * 20) {
        return true
      } else {
        return false
      }
    },
    pre() {
      const route = this.$route
      const query = route.query
      let fullPath = route.fullPath
      if (this.preDisable) {
        return route.fullPath
      }
      let page
      if (query.page && query.page > 1) {
        page = Number(query.page) - 1
        if (page === 1) {
          fullPath = fullPath.replace(/page=[a-zA-Z1-9]+/, '')
        } else {
          fullPath = fullPath.replace(/page=[a-zA-Z1-9]+/, `page=${page}`)
        }
      } else {
        fullPath = fullPath.replace(/page=[a-zA-Z1-9]+/, '')
      }
      return fullPath
    },
    next() {
      const route = this.$route
      const query = route.query
      let fullPath = route.fullPath
      if (this.NextDisable) {
        return fullPath
      }
      let page
      if (query.page) {
        page = Number(query.page) + 1
        fullPath = fullPath.replace(/page=[a-zA-Z1-9]+/, `page=${page}`)
      } else {
        page = 2
        if (Object.keys(query).length === 0) {
          // 看看query数量
          fullPath = `${fullPath}?page=${page}`
        } else {
          fullPath = `${fullPath}&page=${page}`
        }
      }
      return fullPath
    },
  },
}
</script>
<style lang="scss" scoped>
.paginations {
  font-size: 14px;
  height: 40px;
  background-color: $module-bg;
  display: flex;
  user-select: none;
  font-weight: bold;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  .disable {
    cursor: not-allowed !important;
  }
  .pre {
    flex: 1;
    height: 40px;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    svg {
      margin-right: 40px;
    }
    &:hover {
      svg {
        color: $green;
      }
      background-color: $module-hover-bg;
    }
  }
  .next {
    padding: 0 40px;
    flex: 1;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    svg {
      margin-left: 40px;
    }
    &:hover {
      svg {
        color: $red;
      }
      background-color: $module-hover-bg;
    }
  }
  .mid {
    color: white;
    height: 100%;
    line-height: 40px;
    text-align: center;
    width: 200px;
    position: relative;
    background: $keyword;
    &::after {
      content: '';
      position: absolute;
      width: 15px;
      height: 200%;
      top: -50%;
      right: -0.5rem;
      background: $body-bg;
      transform: rotate(18deg);
    }
    &::before {
      content: '';
      position: absolute;
      width: 15px;
      height: 200%;
      top: -50%;
      left: -0.5rem;
      background: $body-bg;
      transform: rotate(18deg);
    }
  }
}
</style>
