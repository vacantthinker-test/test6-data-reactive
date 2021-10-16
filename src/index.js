import {observe, set, Watcher} from "../observer";

const data = {
  dinner: {
    rice: 10,
    veggie: 20
  },
  drinkType: [
    {name: '可乐'},
    {name: '雪碧'},
  ],
  total: 0
}
window.data = data;
observe(data)

//---------------------------------
const methods = {
  incrementRice: function () {
    data.dinner.rice++;
  },
  decrementRice: function () {
    data.dinner.rice--;
  },
  incrementVeggie: function () {
    data.dinner.veggie++;
  },
  decrementVeggie: function () {
    data.dinner.veggie--;
  },
  incrementMeat: function () {
    data.dinner.meat++;
  },
  decrementMeat: function () {
    data.dinner.meat--;
  },
  
}

function updateTotal() {
  data.total = data.dinner.rice + data.dinner.veggie;
  if (data.dinner.meat) {
    data.total += data.dinner.meat;
  }
  console.log(`data.total 总计 ${data.total}`)
}

function render() {
  document.getElementById('app').innerHTML = `
<table>
    <tr>
        <td>米饭</td>
        <td>${data.dinner.rice}</td>
        <td>
            <button @click="incrementRice">+</button>
            <button @click="decrementRice">-</button>
        </td>
    </tr>
    <tr>
        <td>蔬菜</td>
        <td>${data.dinner.veggie}</td>
        <td>
            <button @click="incrementVeggie">+</button>
            <button @click="decrementVeggie">-</button>
        </td>
    </tr>
    <tr>
        <td>肉类</td>
        <td>${data.dinner.meat}</td>
        <td>
            <button @click="incrementMeat">+</button>
            <button @click="decrementMeat">-</button>
        </td>
    </tr>
    <tr>
        <td>总计</td>
        <td>${data.total}</td>
        <td>
        </td>
    </tr>
</table>`
}

function initEvent() {
  document.getElementById('app')
    .addEventListener('click', function (e) {
      let attributes = e.target.attributes;
      // console.log(attributes)
      if (attributes) {
        let clickNode = attributes['@click']
        // console.log(clickNode)
        if (clickNode) {
          let value = clickNode.value;
          console.log(value)
          let method = methods[value];
          if (method) {
            method()
          }
        }
      }
    })
}

initEvent();
updateTotal();
render();
//---------------------------------


new Watcher(data, 'dinner.rice', function () {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>')
  updateTotal()
  render();
})
new Watcher(data, 'dinner.veggie', function () {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>')
  updateTotal()
  render();
})
new Watcher(data, 'dinner.meat', function () {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>')
  updateTotal()
  render();
})

set(data.dinner, 'meat', 0)



















