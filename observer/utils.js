/**
 * 定义obj的属性值
 * @param obj
 * @param key
 * @param val
 * @param enumerable 默认值false, 不可枚举
 */
export function def(obj, key, val, enumerable = false) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: enumerable,
    configurable: true,
    writable: true
  })
}