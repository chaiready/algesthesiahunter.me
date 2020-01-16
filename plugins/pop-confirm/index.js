/*
 * @Description:mini确认框
 * @author: <https://github.com/algesthesiahunter>
 */
import Vue from 'vue'
import { fadeIn } from '@/utils/animation'
import popover from '@/plugins/pop-confirm/popover'
import { isBrowser } from '@/config/env'
/**
 * @description: 删除所有存在popconfirm
 * @param {type}
 * @return:
 */
export function delPop() {
  if (isBrowser) {
    const ori = document.getElementById('popover-main')
    const list = ori.children
    for (let i = 0; i < list.length; i++) {
      const v = list[i]
      fadeIn(v)
      setTimeout(() => {
        v.parentNode.removeChild(v)
      }, 100)
    }
  }
}
/**
 * @description: 注入并渲染popconfirm
 * @param {type}
 * @return:
 */
export function popChange(event, vm) {
  if (isBrowser) {
    delPop()
    const ori = document.getElementById('popover-main')
    const div = document.createElement('div')
    div.setAttribute('id', 'create-pop')
    ori.appendChild(div)
    const app = document.getElementById('create-pop')
    fadeIn(app)
    setTimeout(() => {
      const vue = new Vue({
        template: `<popover y="${event.pageY - 5}" x="${event.pageX}" title="${
          vm.title
        }"></popover>`,
        components: {
          popover,
        },
      }).$mount(app)
      const btn = vue.$el.querySelector('.sub-btn')
      btn.onclick = () => {
        vm.submit()
        delPop()
      }
    }, 100)

    event.stopPropagation()
  }
}
/**
 * @description: 引入时，注入容器以供popconirm定位
 * @param {type}
 * @return:
 */
if (isBrowser) {
  const popoverMain = document.getElementById('popover-main')
  if (!popoverMain) {
    const div = document.createElement('div')
    div.setAttribute('id', 'popover-main')
    div.setAttribute('style', 'position: absolute;top: 0px;left: 0px;')
    document.body.appendChild(div)
    document.body.onclick = delPop
  }
}
