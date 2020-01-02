/*
 * @Description:各种排序
 * @author: <https://github.com/algesthesiahunter>
 */
export const insertSort = function(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[0]) {
      arr.unshift(arr.splice(i, 1)[0])
    } else {
      for (let j = i - 1; j >= 0; j--) {
        if (arr[i] < arr[j]) {
          let current = arr.splice(i, 1)[0]
          arr.splice(j + 1, 0, current)
          break
        }
      }
    }
  }
  return arr
}
const quickSort = function(arr, func, filter) {
  if (arr.length <= 1) {
    return arr
  }
  if (typeof func != 'function') {
    func = (a, b) => a - b > 0
  }
  let index = Math.floor(arr.length / 2)
  let mid = arr.splice(index, 1)[0]
  let left = [],
    right = []
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i]
    let funcBack = func
    if (filter) {
      funcBack = (a, b) => func(filter(a), filter(b))
    }
    if (funcBack(v, mid)) {
      left.push(v)
    } else {
      right.push(v)
    }
  }
  return quickSort(left, func, filter).concat(
    mid,
    quickSort(right, func, filter)
  )
}
export default quickSort
