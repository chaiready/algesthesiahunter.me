import source from '@/markdown'
import sort from '@/utils/sort'

let sourceDate = []
for (const [k, v] of source) {
  for (const [key, value] of v.entries()) {
    sourceDate.push(value)
    sourceDate = sort(sourceDate, null, val => new Date(val.attributes.date))
  }
}

const getArticleDetail = id =>
  sourceDate.filter(v => v.attributes.date === id)[0]

export { getArticleDetail, sourceDate }
