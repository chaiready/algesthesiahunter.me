<template>
  <div class="dialog" v-if="value">
    <div class="dialog-main">
      <div class="title">
        <svg-icon icon-class="delete" class="delete" @click="close"></svg-icon>
      </div>
      <div class="form">
        <span>管理员登录</span>
        <input
          type="password"
          class="inp"
          v-focus
          v-model="password"
          @keyup.enter="submit"
          @click="() => {}"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'MaskDialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      password: null,
    }
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
  computed: {},
  methods: {
    ...mapActions('common', ['login']),
    submit() {
      this.login(this.password).then(() => this.$emit('input', false))
    },
    close() {
      this.$emit('input', false)
    },
  },
  created() {},
  mounted() {},
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
    padding: 20px;
    position: relative;
    margin: 200px auto;
    background: $body-bg;
    border-radius: 2px;
    box-sizing: border-box;
    width: 460px;
    .title {
      margin-bottom: 30px;
      font-size: 20px;
      text-align: end;
      .delete {
        font-size: 28px;
        cursor: pointer;
      }
    }
    .form {
      font-size: 16px;
      margin-bottom: 10px;
      .inp {
        border: 1px solid $black-light;
        display: inline-block;
        height: 34px;
        border-radius: 2px;
        padding: 0 15px;
        margin-left: 30px;
        width: 260px;
        &:focus {
          border: 1px solid $primary;
        }
      }
    }
  }
}
</style>
