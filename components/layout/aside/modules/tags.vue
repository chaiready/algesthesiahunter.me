<template>
  <div class="tags-container">
    <loading-box class="loading" v-if="tags.length === 0" />
    <template v-else>
      <ul class="main">
        <li v-for="(it, i) in tags" :key="i" class="li">
          <NuxtLink
            :to="pathLang('/tags/' + it.name + '?tags=' + it._id, lang)"
            class="it"
          >
            <span class="svg-box"
              ><svg-icon :icon-class="it.name" class="svg"></svg-icon
            ></span>
            <span class="text"
              >{{ $t(`tag.${it.name}`) }} [{{ it.articles }}]
            </span>
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
        v-if="mode"
        v-model="show"
        :title="type ? '添加Tag' : '编辑Tag'"
        @submit="submit"
      >
        <div class="form">
          <span>名称</span>
          <input v-focus v-model="name" @keyup.enter="submit" type="text" />
        </div>
      </MaskDialog>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Tags',
  data() {
    return {
      name: null,
      show: false,
      type: 0,
      current: null,
    }
  },
  computed: {
    ...mapState('common', ['mode', 'lang']),
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
}
</script>
<style lang="scss" scoped>
.tags-container {
  width: 268px;
  padding: 0px 12px 12px 12px;
  background-color: $module-bg;
  overflow: hidden;
  position: relative;
  min-height: 126px;
}
.main {
  display: flex;
  flex-wrap: wrap;
  .li {
    transition: all 0.25s linear;
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
    transition: all 0.25s linear;
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
