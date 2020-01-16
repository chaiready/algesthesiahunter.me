<template>
  <div class="category-container">
    <ul class="main">
      <li v-for="(it, i) in tags" :key="i" class="li">
        <NuxtLink :to="'/tags/' + it.name + '?tags=' + it._id" class="it">
          <span class="svg-box"
            ><svg-icon :icon-class="it.name" class="svg"></svg-icon
          ></span>
          <span class="text">{{ $t(`tag.${it.name}`) }} [{{ it.count }}] </span>
        </NuxtLink>
        <operating
          v-if="mode"
          :it="it"
          @edit="modeChange(0, it)"
          @ConfirmSubmit="ConfirmSubmit"
          class="operating"
        >
        </operating>
      </li>
      <li v-if="mode">
        <a @click="modeChange(1)" href="javascript:void(0);" class="it">
          <span class="svg-box"
            ><svg-icon icon-class="tag" class="svg"></svg-icon>
          </span>
          <span class="text">妙手生花</span>
        </a>
      </li>
    </ul>
    <MaskDialog
      v-model="show"
      :title="type ? '添加Tag' : '编辑Tag'"
      @submit="submit"
    >
      <div class="form">
        <span>名称</span>
        <input v-focus v-model="name" @keyup.enter="submit" type="text" />
      </div>
    </MaskDialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      name: null,
      show: false,
      type: 0,
      current: null,
    }
  },
  computed: {
    ...mapState('common', ['mode']),
    ...mapState('tag', ['tags']),
  },
  methods: {
    ...mapActions('tag', ['getTags', 'postTag', 'deleteTag', 'putTag']),
    ConfirmSubmit(id) {
      this.deleteTag(id).then(() => this.init())
    },
    submit() {
      if (this.type) {
        this.postTag(this.name).then(() => this.init())
        return false
      }
      this.putTag({
        id: this.current._id,
        params: { name: this.name },
      }).then(() => this.init())
    },
    modeChange(type, it) {
      this.show = true
      this.type = type
      if (type === 1) {
        // 新增
        this.name = null
        return false
      }
      // 编辑
      this.name = it.name
      this.current = it
    },
    init() {
      this.getTags()
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss" scoped>
.category-container {
  width: 268px;
  padding: 0px 12px 12px 12px;
  background-color: $module-bg;
  overflow: hidden;
}
.main {
  display: flex;
  flex-wrap: wrap;
  .li {
    position: relative;
    &:hover {
      .operating {
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .it {
    margin-top: 12px;
    margin-right: 8px;
    padding-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      .text {
        background-color: $module-hover-bg-darken-20;
      }
      .svg-box {
        background-color: $module-hover-bg;
      }
    }
    .svg-box {
      background-color: $module-hover-bg-opacity-3;
      width: 26px;
      font-size: 14px;
      height: 26px;
      line-height: 26px;
      display: inline-block;
      text-align: center;
    }
    .text {
      text-transform: capitalize;
      display: inline-block;
      height: 26px;
      line-height: 26px;
      padding: 0 7px;
      background-color: $module-hover-bg;
    }
  }
}
</style>
