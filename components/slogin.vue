<template>
  <div class="slogin" :style="sloginStyle">
    <svg-icon :icon-class="name" class="slogin-svg"></svg-icon>
    <div class="text">{{ text }}</div>
  </div>
</template>
<script>
export default {
  name: 'Slogin',
  props: {
    sloginStyle: {},
    name: {},
    text: {},
  },
}
</script>
<style lang="scss" scoped>
.slogin {
  margin-bottom: 15px;
  color: white;
  height: 200px;
  background-color: $module-hover-bg-opacity-3;
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  .slogin-svg {
    font-size: 62px;
    margin-top: 0.7em;
    animation: scale-svg 5s -0.15s infinite linear;
  }
  @keyframes scale-svg {
    50% {
      opacity: 0.2;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  .text {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 30px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 15px;
    text-align: center;
  }
}
</style>
