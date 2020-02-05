import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
export default function unixToCommonFilter(time, lang, format) {
  format = format || 'YYYY/M/D a'
  const t = dayjs(time)
  if (lang === 'zh') {
    return dayjs
      .unix(t / 1000)
      .locale('zh-cn')
      .format('YYYY/M/D a')
  } else {
    return dayjs.unix(t / 1000).format('YYYY/M/D a')
  }
}
