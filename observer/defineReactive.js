import {observe} from "./observe";
import {Dep} from "./Dep";

export function defineReactive(obj, key, val) {
  const dep = new Dep(); // 闭包中的dep, obj对象中每一个key-value都有一个dep实例
  
  let childOb = observe(val);
  
  Object.defineProperty(obj, key, {
    get() {
      console.log('响应式 getter ')
      console.log(key)
      console.log(val)
      console.log('--------------')
      
      dep.depend();
      
      if (childOb) {
        childOb.dep.depend();
      }
      
      return val;
    },
    set(newValue) {
      console.log('响应式 setter ')
      console.log(key)
      console.log(newValue)
      console.log('--------------')
      val = newValue;
      childOb = observe(val);
      
      dep.notify();
    }
  })
}

export function set(obj, key, val) {
  if (arguments.length !== 3) {
    throw new Error('需要3个参数')
  }
  
  // 假设obj有__ob__属性
  let ob = obj.__ob__;
  defineReactive(obj, key, val)
  ob.dep.notify();
  
}
















