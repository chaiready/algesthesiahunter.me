let source = new Map()

function importAll(r) {
  r.keys().forEach(key => {
    let str = key.match(/\w+/)
    let v = source.get(str[0])
    if (v) {
      v.add(r(key))
    } else {
      source.set(str[0], new Set([r(key)]))
    }
  })
}
importAll(require.context('./modules', true, /\.md$/))
export default source
