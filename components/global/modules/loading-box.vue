<template>
  <div v-show="loading" class="spinner-box">
    <div class="spinner-inner">
      <div class="la-ball-beat">
        <div :style="spinnerStyle"></div>
        <div :style="spinnerStyle"></div>
        <div :style="spinnerStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingBox',
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'rgba(197, 197, 197, 0.4)',
    },
    height: {
      type: String,
      default: '15px',
    },
    width: {
      type: String,
      default: '15px',
    },
    margin: {
      type: String,
    },
  },
  data() {
    return {
      spinnerStyle: {
        backgroundColor: this.color,
        height: this.height,
        width: this.width,
        margin: this.margin,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.spinner-box {
  position: relative;
  width: 100%;
  height: 100%;

  @keyframes ball-beat {
    50% {
      opacity: 0.2;
      transform: scale(0.75);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  > .spinner-inner {
    width: 80px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    > .la-ball-beat {
      display: block;
      position: relative;
      box-sizing: border-box;
      font-size: 0;
      color: #fff;
      width: 80px;

      > div {
        position: relative;
        box-sizing: border-box;
        display: inline-block;
        float: none;
        border: none;
        width: 15px;
        height: 15px;
        margin: 0 5px;
        background-color: $module-hover-bg;
        animation: ball-beat 0.7s -0.15s infinite linear;

        &:nth-child(2n-1) {
          animation-delay: -0.5s;
        }
      }

      &.la-sm {
        width: 26px;
        height: 8px;

        > div {
          width: 8px;
          height: 8px;
          margin: 3px;
        }
      }

      &.la-2x {
        width: 108px;
        height: 36px;

        > div {
          width: 20px;
          height: 20px;
          margin: 8px;
        }
      }

      &.la-3x {
        width: 162px;
        height: 54px;

        > div {
          width: 30px;
          margin: 12px;
        }
      }
    }
  }
}
</style>
