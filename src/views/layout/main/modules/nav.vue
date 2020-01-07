<template>
  <div class="nav-container">
    <nav class="nav-list">
      <router-link class="it" :to="'/'" exact>
        <svg-icon icon-class="home"></svg-icon>
        {{ navList.home }}</router-link
      >
      <div class="operating-it" v-for="(it, i) in categorys" :key="i">
        <router-link class="it" :to="'/' + it.name">
          <svg-icon :icon-class="it.name"></svg-icon>
          {{ $t(`nav.${it.name}`) }}
        </router-link>
        <operating
          v-if="mode"
          :it="it"
          class="operating"
          @edit="modeChange(0, it)"
          @ConfirmSubmit="ConfirmSubmit"
        ></operating>
      </div>

      <a class="it" target="_blank" href="https://algesthesiahunter.github.io">
        <svg-icon icon-class="project"></svg-icon>
        {{ navList.project }}</a
      >
      <router-link class="it" to="/about">
        <svg-icon icon-class="about"></svg-icon>
        {{ navList.about }}
      </router-link>
      <a
        href="javascript:void(0);"
        class="it"
        @click="modeChange(1)"
        v-if="mode"
      >
        <svg-icon icon-class="route.category"></svg-icon>
        妙手生花</a
      >
    </nav>
    <MaskDialog
      v-model="show"
      :title="type ? '添加category' : '编辑category'"
      @submit="submit"
    >
      <div class="form">
        <span>名称</span>
        <input type="text" v-focus v-model="name" @keyup.enter="submit" />
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
    ...mapState('category', ['categorys']),
    navList() {
      return this.$t('nav')
    },
  },
  methods: {
    ...mapActions('category', [
      'getCategorys',
      'postCategory',
      'deleteCategory',
      'putCategory',
    ]),
    ConfirmSubmit(id) {
      this.deleteCategory(id).then(() => this.init())
    },
    modeChange(type, it) {
      this.show = true
      this.type = type
      if (type === 1) {
        //新增
        this.name = null
        return false
      }
      // 编辑
      this.name = it.name
      this.current = it
    },
    init() {
      this.getCategorys()
    },
    submit() {
      if (this.type) {
        this.postCategory(this.name).then(() => this.init())
        return false
      }
      this.putCategory({
        id: this.current._id,
        params: { name: this.name },
      }).then(() => this.init())
    },
  },
  mounted() {
    this.init()
    console.log(this.navList)
  },
}
</script>

<style scoped lang="scss">
.nav-container {
  margin-right: 15px;
  width: 160px;
  user-select: none;
  .nav-list {
    width: 160px;
    padding: 0;
    margin: 0;
    position: fixed;
    display: flex;
    flex-direction: column;
    .operating-it {
      position: relative;
      &:hover {
        .operating {
          visibility: visible;
          opacity: 1;
        }
      }
    }
    .it {
      border: none;
      display: flex;
      align-items: center;

      width: 100%;
      height: 42px;
      padding: 0 14px;
      text-decoration: none;
      text-transform: uppercase;
      font-weight: 700;
      border-radius: 1px;
      font-size: 14px;
      letter-spacing: 0.5px;
      margin-bottom: 7px;
      &:hover {
        color: $primary;
      }
      svg {
        margin-right: 14px;
      }
      &.router-link-active {
        color: $primary;
        background-color: $module-bg;
      }
    }
  }
}
</style>
