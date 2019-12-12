import marked from 'marked'
import highlight from 'highlight'
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
const renderer = new marked.Renderer()
export default content => {
  if (typeof content !== 'string') {
    return ''
  }
  return marked(content, { renderer })
}
