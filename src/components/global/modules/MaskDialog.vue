<template>
  <transition name="fade">
    <div class="dialog" v-if="value">
      <div class="dialog-main">
        <div class="title">
          {{ title }}
          <svg-icon
            icon-class="delete"
            class="delete"
            @click="close"
          ></svg-icon>
        </div>
        <div class="body">
          <slot></slot>
        </div>
        <div class="footer">
          <ElButton @click="close">取 消</ElButton>
          <ElButton style="margin-left:8px" type="primary" @click="submit"
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
      let bodyEl = document.body
      if (n) {
        bodyEl.style.position = 'fixed'
      } else {
        bodyEl.style.position = 'static'
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
    position: relative;
    margin: 200px auto;
    background: $module-bg;
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
      border-bottom: 1px solid $module-bg;
      .delete {
        font-size: 24px;
        cursor: pointer;
      }
    }
    .footer {
      border-top: 1px solid $module-bg;
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
