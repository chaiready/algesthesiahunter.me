<template>
  <div :class="{ 'category-container': true, 'if-fixed': !categoryFixed }">
    <ul class="main">
      <li class="it">
        <router-link to="/coding">
          <span class="svg-box"
            ><svg-icon icon-class="hot" class="svg"></svg-icon
          ></span>
          <span class="text">树和远方 [10]</span></router-link
        >
      </li>
      <li class="it">
        <router-link to="/coding">
          <span class="svg-box  "
            ><svg-icon icon-class="hot" class="svg  "></svg-icon
          ></span>
          <span class="text  ">思考 [10]</span>
        </router-link>
      </li>
      <li class="it">
        <router-link to="/coding">
          <span class="svg-box  "
            ><svg-icon icon-class="hot" class="svg  "></svg-icon
          ></span>
          <span class="text    "> javasccript [10]</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categoryFixed: {
      type: Boolean,
    },
  },
}
</script>
<style lang="scss" scoped>
.category-container {
  width: 268px;
  padding: 0px 12px 12px 12px;
  background-color: $module-bg;
  overflow: hidden;
  &.if-fixed {
    position: fixed;
  }
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
      height: 26px;
      line-height: 26px;
      display: inline-block;
      text-align: center;
    }
    .text {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      padding: 0 7px;
      background-color: $module-hover-bg;
    }
  }
}
</style>
