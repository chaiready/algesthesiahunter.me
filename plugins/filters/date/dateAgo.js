import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
export default function dateAgo(date, lang) {
  if (lang === 'zh') {
    return dayjs(date)
      .locale('zh-cn')
      .fromNow()
  }
  return dayjs(date).fromNow()
}
