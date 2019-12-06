function getType(obj) {
  const str = Reflect.toString.call(obj)
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Map]': 'map',
    '[object Set]': 'set',
  }
  if (obj instanceof Element) {
    // 判断是否是dom元素，如div等
    return 'element'
  }
  return map[str]
}

export default function deepClone(ori) {
  const type = getType(ori)
  let copy
  switch (type) {
    case 'array':
      return copyArray(ori, copy)
    case 'object':
      return copyObject(ori, copy)
    case 'function':
      return copyFunction(ori)
    case 'map':
      return copyMap(ori, copy)
    case 'set':
      return copySet(ori, copy)
    default:
      return ori
  }
}

function copyArray(ori, copy = []) {
  for (const [index, value] of ori.entries()) {
    copy[index] = deepClone(value)
  }
  return copy
}

function copyObject(ori, copy = {}) {
  for (const [key, value] of Reflect.entries(ori)) {
    copy[key] = deepClone(value)
  }
  return copy
}

function copyMap(ori, copy = new Map()) {
  for (const [key, value] of ori) {
    copy.set(deepClone(value))
  }
  return copy
}

function copySet(ori, copy = new Set()) {
  for (const [key, value] of ori.entries()) {
    copy.add(key, deepClone(value))
  }
  return copy
}

function copyFunction(ori) {
  const fun = eval(ori.toString())
  fun.prototype = ori.prototype
  return fun
}
