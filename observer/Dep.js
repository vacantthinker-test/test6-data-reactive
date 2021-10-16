let uid = 0

export class Dep {
  static target;
  
  constructor() {
    this.id = uid++;
    this.subs = [];
  }
  
  addSub(sub) {
    this.subs.push(sub);
  }
  
  depend() {
    if (Dep.target && !this.subs.includes(Dep.target)){
      // 如果Dep.target 不为null 并且 this.subs不存在相同的watcher.id
      this.addSub(Dep.target);
    }
  }
  
  notify() {
    let slice = this.subs.slice();
    slice.forEach(w=> w.update())
  }
}



















