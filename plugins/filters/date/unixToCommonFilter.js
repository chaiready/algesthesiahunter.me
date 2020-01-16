import dayjs from 'dayjs'

export default function unixToCommonFilter(time, format) {
  if (format) {
    return dayjs.unix(time / 1000).format(format)
  }
  const t = dayjs(time)
  return dayjs.unix(t / 1000).format('YYYY/M/D HH:mm:ss')
}
