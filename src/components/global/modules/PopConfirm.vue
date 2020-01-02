<template>
  <div class="pop-confirm">
    <div @click="popChange($event)"><slot></slot></div>
  </div>
</template>

<script>
import { popChange } from 'utils/PopConfirm'
export default {
  name: 'PopConfirm',
  props: {
    title: {
      type: String,
      default: '标题',
    },
  },
  data() {
    return {}
  },
  methods: {
    popChange(event) {
      //点击注入tiltop框而已
      popChange(event, this)
    },
    submit() {
      this.$emit('ConfirmSubmit')
    },
  },
}
</script>
