import marked from 'marked'
import highlight from 'highlight'
const renderer = new marked.Renderer()
const imgRender = src => {
  src = `${window.cdn}${src}`
  const imageHtml = `
    <img
      class="lozad"
      src="${src}"
      onclick="if (window.utils) window.utils.addImgPopup('${src}')"
    />
  `
  return imageHtml.replace(/\s+/g, ' ').replace(/\n/g, ' ')
}
renderer.image = imgRender

marked.setOptions({
  renderer,
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
export default content => {
  if (typeof content !== 'string') {
    return ''
  }
  return marked(content)
}
