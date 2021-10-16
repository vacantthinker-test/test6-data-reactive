import {def} from "./utils";
import {defineArray} from "./defineArray";
import {defineReactive} from "./defineReactive";
import {observe} from "./observe";
import {Dep} from "./Dep";

export class Observer {
  constructor(value) {
    this.dep = new Dep(); // 每一个Observer都有一个Dep实例
    def(value, '__ob__', this, false);
    if (Array.isArray(value)) {
      defineArray(value)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  
  walk(obj) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = obj[key];
      defineReactive(obj, key, value)
    }
  }
  
  observeArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      observe(arr[i])
    }
  }
}














