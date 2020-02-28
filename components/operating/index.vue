<!--
 * @Description:精致的操作组编辑删除
 * @author: <https://github.com/algesthesiahunter>
 -->
<template>
  <div class="_operating-box" @click.stop="() => {}">
    <div class="_operating" v-if="visible">
      <span>
        <svg-icon
          class="_operating-edit"
          icon-class="group.edit"
          @click="$emit('edit')"
        ></svg-icon>
      </span>
      <span>
        <svg-icon
          class="_operating-delete"
          icon-class="group.delete"
          @click="deleteChange"
        ></svg-icon>
      </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import popover from './popover'
export default {
  props: {
    visible: {},
    name: {},
  },
  methods: {
    deleteChange(e) {
      const popoverMain = document.getElementById('popover-main')
      popoverMain.style.display = 'block'
      const bodyEl = document.body
      bodyEl.style.position = 'fixed' // 定格body
      bodyEl.style.width = '100vw'
      const operatingPopover = document.getElementById('_operating-popover')
      if (operatingPopover) {
        operatingPopover.style.display = 'block'
        operatingPopover.style.left = e.x + 'px'
        operatingPopover.style.top = e.y + 'px'
        const title = operatingPopover.getElementsByClassName('title')[0]
        title.textContent = '确定删除 ' + this.name + ' ？'
      } else {
        new Vue({
          render: (h) =>
            h(popover, {
              props: {
                title: '确定删除 ' + this.name + ' ？',
                x: e.x,
                y: e.y,
              },
              on: {
                cancel: this.cancel,
                submit: () => this.$emit('submit'),
              },
            }),
        }).$mount('#_popover-son')
      }
    },
    cancel() {
      const popoverMain = document.getElementById('popover-main')
      popoverMain.style.display = 'none'
      const bodyEl = document.body
      bodyEl.style.position = 'static'
      bodyEl.style.width = 'auto'
    },
  },
  mounted() {
    this.$el.parentNode.classList.add('_operating-container')
    this.$el.parentNode.parentNode.classList.add('_operating-father')
    let popoverMain = document.getElementById('popover-main')
    if (!popoverMain) {
      const div = document.createElement('div')
      div.setAttribute('id', 'popover-main')
      div.setAttribute(
        'style',
        'position: fixed;top: 0px;left: 0px;height:100vh;width:100vw;display:none;z-index:2019;background:#00000080'
      )
      div.innerHTML = `<div id="_popover-son"></div>`
      document.body.appendChild(div)
      popoverMain = document.getElementById('popover-main')
      popoverMain.onclick = this.cancel
    }
  },
}
</script>
<style lang="scss">
._operating-container {
  position: relative;
  z-index: 1000;
  &:hover {
    ._operating {
      visibility: visible;
      opacity: 1;
    }
  }
  ._operating {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    right: 10px;
    top: -7px;
  }
  ._operating-box {
    ._operating {
      display: flex;
      align-items: center;
      font-size: 16px;
      cursor: pointer;
      span {
        padding: 5px 2px;
      }
      ._operating-edit {
        &:hover {
          color: #0088f5;
        }
      }
      ._operating-delete {
        &:hover {
          color: #ff5722;
        }
      }
    }
  }
}
</style>
