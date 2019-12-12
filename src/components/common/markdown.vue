<template>
  <div class="markdown-theme" ref="markdown" v-html="markedInit(value)"></div>
</template>

<script>
import marked from '@/utils/marked'
import ClipboardJS from 'clipboard'

export default {
  props: {
    value: {},
  },
  data() {
    return {}
  },
  methods: {
    markedInit(v) {
      return marked(v)
    },
    addCopyBtn() {
      let pres = this.$refs.markdown.getElementsByTagName('pre')
      if (!pres.length) {
        return false
      }
      pres.forEach((v, i) => {
        let code = v.firstChild
        code.setAttribute('id', `copy_target_${i}`)
        let div = document.createElement('div')
        div.innerHTML = `<div class="esa-clipboard-button" data-clipboard-target="#copy_target_${i}">Copy</div>`
        v.appendChild(div)
      })
      let clipboard = new ClipboardJS('.esa-clipboard-button')
      clipboard.on('success', e => {
        this.showMessage('代码已复制')
        e.clearSelection()
      })
      clipboard.on('error', e => {
        this.showMessage('代码复制失败')
      })
    },
  },
  mounted() {
    this.addCopyBtn()
  },
}
</script>
<style lang="scss">
.markdown-theme {
}
</style>
