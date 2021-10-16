import {def} from "./utils";
import {observe} from "./observe";

const arrayPrototype = Array.prototype;
const arrayMethods = Object.create(arrayPrototype);
const methodsNeedChange = ['push', 'pop', 'shift', 'unshift'
  , 'sort', 'splice', 'reverse'];

methodsNeedChange.forEach(methodName => {
  const originalMethod = arrayMethods[methodName]
  def(arrayMethods, methodName, function (...args) {
    console.log('响应式 数组 更新了...')
    
    const result = originalMethod.apply(this, args);
    const ob = this.__ob__;
    
    let inserted = []
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted.length > 0) {
      observe(inserted)
    }
    ob.dep.notify();
    
    return result;
  })
})

export function defineArray(arr) {
  // 重写数组中的7个方法
  Object.setPrototypeOf(arr, arrayMethods)
}









