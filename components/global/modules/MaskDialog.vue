<template>
  <transition name="fade">
    <div v-if="value" class="dialog">
      <div class="dialog-main">
        <div class="title">
          {{ title }}
          <svg-icon
            @click="close"
            icon-class="delete"
            class="delete"
          ></svg-icon>
        </div>
        <div class="body">
          <slot></slot>
        </div>
        <div class="footer">
          <ElButton @click="close">取 消</ElButton>
          <ElButton @click="submit" style="margin-left:8px" type="primary"
            >确 定</ElButton
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MaskDialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '标题',
    },
  },
  data() {
    return {}
  },
  watch: {
    value(n) {
      const bodyEl = document.body
      if (n) {
        bodyEl.style.position = 'fixed'
        bodyEl.style.width = '100vw'
      } else {
        bodyEl.style.position = 'static'
        bodyEl.style.width = 'auto'
      }
    },
  },
  methods: {
    submit() {
      this.$emit('submit')
    },
    close() {
      this.$emit('input', false)
    },
  },
}
</script>
<style lang="scss" scoped>
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba($black, 0.5);
  z-index: 2019;
  .dialog-main {
    position: absolute;
    left: 50%;
    top: 180px;
    transform: translateX(-50%);
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    box-sizing: border-box;
    width: 460px;
    .title {
      display: flex;
      justify-content: space-between;
      padding: 16px 24px;
      padding-right: 15px !important;
      text-align: end;
      font-weight: 500;
      font-size: 16px;
      color: $text;
      line-height: 24px;
      border-bottom: 1px solid #f0f0f0;
      .delete {
        font-size: 24px;
        cursor: pointer;
      }
    }
    .footer {
      border-top: 1px solid #f0f0f0;
      padding: 10px 16px;
      text-align: right;
    }
    .body {
      padding: 24px;
      font-size: 14px;
    }
  }
}
</style>
