/*
 * @Description:mini确认框
 * @author: <https://github.com/algesthesiahunter>
 */
import { fadeIn } from '@/utils/animation'
import Vue from 'vue'
import popover from '@/components/common/popover'

/**
 * @description: 删除所有存在popconfirm
 * @param {type}
 * @return:
 */
export function delPop() {
  let ori = document.getElementById('popover-main')
  let list = ori.children
  for (let i = 0; i < list.length; i++) {
    const v = list[i]
    fadeIn(v)
    setTimeout(() => {
      v.parentNode.removeChild(v)
    }, 100)
  }
}
/**
 * @description: 注入并渲染popconfirm
 * @param {type}
 * @return:
 */
export function popChange(event, vm) {
  delPop()
  let ori = document.getElementById('popover-main')
  let div = document.createElement('div')
  div.setAttribute('id', 'create-pop')
  ori.appendChild(div)
  let app = document.getElementById('create-pop')
  fadeIn(app)
  setTimeout(() => {
    let vue = new Vue({
      template: `<popover y="${event.y}" x="${event.x}" title="${vm.title}"></popover>`,
      components: {
        popover,
      },
    }).$mount(app)
    let btn = vue.$el.querySelector('.sub-btn')
    btn.onclick = () => {
      vm.submit()
      delPop()
    }
  }, 100)

  event.stopPropagation()
}
/**
 * @description: 引入时，注入容器以供popconirm定位
 * @param {type}
 * @return:
 */
let popoverMain = document.getElementById('popover-main')
if (!popoverMain) {
  let div = document.createElement('div')
  div.setAttribute('id', 'popover-main')
  div.setAttribute('style', 'position: absolute;top: 0px;left: 0px;')
  document.body.appendChild(div)
  document.body.onclick = delPop
}
