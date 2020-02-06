<template>
  <div>
    <div
      ref="markdown"
      v-html="marked(contentFilter)"
      class="markdown-theme"
    ></div>
    <div ref="mk-more" class="mk-more"></div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'
import lozad from 'lozad'
import marked from '@/plugins/marked'
import '@/assets/markdown.theme.scss'
export default {
  props: {
    value: {},
  },
  data() {
    return {
      limit: 2600,
      index: 0,
      clipboard: null,
    }
  },
  computed: {
    contentFilter() {
      return this.value.slice(0, (this.index + 1) * this.limit)
    },
    maxIndex() {
      return Math.ceil(this.value.length / this.limit)
    },
  },
  mounted() {
    const height = window.screen.availHeight
    if (height) {
      this.limit = (this.limit / 1050) * height
    }
    this.markedInit()
  },
  methods: {
    marked,
    markedInit() {
      const options = {
        root: null,
        rootMargin: '50px 0px 0px 0px',
      }
      const io = new IntersectionObserver(this.markedCallback, options)
      io.observe(this.$refs['mk-more'])
      this.nextRender()
    },
    markedCallback(v) {
      if (v[0].isIntersecting && this.index < this.maxIndex) {
        this.index++
        this.nextRender()
      }
    },
    nextRender() {
      this.$nextTick(() => {
        const observer = lozad()
        observer.observe()
        this.addCopyBtn()
      })
    },
    addCopyBtn() {
      const pres =
        this.$refs.markdown && this.$refs.markdown.getElementsByTagName('pre')
      if (!pres || (pres && !pres.length)) {
        return false
      }
      for (let i = 0; i < pres.length; i++) {
        const v = pres[i]
        const code = v.firstChild
        if (!code.getAttribute('id')) {
          code.setAttribute('id', `copy_target_${i}`)
          const div = document.createElement('div')
          div.innerHTML = `<div class="esa-clipboard-button" data-clipboard-target="#copy_target_${i}">Copy</div>`
          v.appendChild(div)
        }
      }
      this.clipboard = new ClipboardJS('.esa-clipboard-button')
      this.clipboard.on('success', (e) => {
        this.showMessage('代码已复制')
        e.clearSelection()
      })
      this.clipboard.on('error', (e) => {
        this.showMessage('代码复制失败')
      })
    },
  },
  beforeDestory() {
    this.clipboard.destroy()
  },
}
</script>
