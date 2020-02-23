<template>
  <div class="tool-container">
    <div class="tool-box">
      <div @click="scroll(0)" class="svg-box">
        <svg-icon icon-class="scroll-top"></svg-icon>
      </div>
      <div @click="scroll(1)" class="svg-box">
        <svg-icon icon-class="scroll-top" class="ano"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'
export default {
  name: 'Scrolltool',
  methods: {
    scroll(type) {
      let num
      if (!type) {
        num = 0
      } else {
        num = document.getElementById('main').clientHeight
      }
      scrollTo(num)
    },
  },
}
</script>

<style scoped lang="scss">
.tool-container {
  position: fixed;
  bottom: 50px;
  .tool-box {
    position: absolute;
    left: 1150px;
    bottom: 100px;
    width: 40px;
    height: 110px;
    display: flex;
    flex-wrap: wrap;
    font-size: 22px;
    .svg-box {
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
      background-color: $module-bg;
      cursor: pointer;
      margin-bottom: 15px;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: $module-hover-bg;
        border: $border-solid;
      }
      .ano {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
