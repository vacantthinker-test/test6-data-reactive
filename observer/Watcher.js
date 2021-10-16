import {Dep} from "./Dep";

let uid = 0;

export class Watcher {
  constructor(target, expression, callback) {
    this.id = uid++;
    this.target = target;
    this.getter = parsePath(expression);
    this.callback = callback;
    this.originalValue = this.get();
  }
  
  update() {
    console.log('Watcher update() 方法执行了 ')
    const newValue = this.get();
    const oldValue = this.originalValue;
    if (newValue !== oldValue) {
      this.originalValue = newValue;
      // thisArg: any,     ...argArray: any[]): an
      this.callback.call(this.target, newValue, oldValue);
    }
    
  }
  
  get() {
    Dep.target = this;
    const obj = this.target;
    let value;
    try {
      value = this.getter(obj);
    } catch (e) {
      console.log(e)
    } finally {
      Dep.target = null;
    }
    
    return value;
  }
}

function parsePath(expression) {
  const segments = expression.split('.');
  return function (obj) {
    segments.forEach(function (key) {
      obj = obj[key];
    })
    return obj;
  };
}



















