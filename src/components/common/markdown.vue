<template>
  <div class="markdown-theme" ref="markdown"></div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight'
import ClipboardJS from 'clipboard'
export default {
  props: {
    value: {},
  },
  data() {
    return {}
  },
  methods: {
    markedInit() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function(code) {
          return highlight.highlightAuto(code).value
        },
      })
      this.$refs.markdown.innerHTML = marked(this.value)
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
    this.markedInit()
    this.addCopyBtn()
  },
}
</script>
<style lang="scss">
.markdown-theme {
}
</style>
