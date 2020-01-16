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
      limit: 1300,
      index: 0,
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
    },
    markedCallback(v) {
      if (v[0].isIntersecting && this.index < this.maxIndex) {
        this.index++
        this.$nextTick(() => {
          const observer = lozad()
          observer.observe()
          this.addCopyBtn()
        })
      }
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
      const clipboard = new ClipboardJS('.esa-clipboard-button')
      clipboard.on('success', e => {
        this.showMessage('代码已复制')
        e.clearSelection()
      })
      clipboard.on('error', e => {
        this.showMessage('代码复制失败')
      })
    },
  },
}
</script>
