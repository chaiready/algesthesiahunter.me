<template>
  <div class="nav-container">
    <nav class="nav-list">
      <NuxtLink :to="pathLang('/', lang)" class="it" exact>
        <svg-icon icon-class="home"></svg-icon>
        {{ navList.home }}
      </NuxtLink>
      <div v-for="(it, i) in categorys" :key="i">
        <NuxtLink
          :to="pathLang(`/category/${it.name}?category=${it._id}`, lang)"
          class="it"
        >
          <svg-icon :icon-class="it.name"></svg-icon>
          {{ $t(`nav.${it.name}`) }}
        </NuxtLink>
        <operating
          :visible="mode"
          :name="it.name"
          @edit="modeChange(0, it)"
          @submit="ConfirmSubmit(it._id)"
        ></operating>
      </div>

      <a
        class="it"
        target="_blank"
        rel="noopener"
        href="https://coding.algesthesiahunter.top"
      >
        <svg-icon icon-class="project"></svg-icon>
        {{ navList.project }}
      </a>
      <NuxtLink class="it" :to="pathLang('/about', lang)">
        <svg-icon icon-class="about"></svg-icon>
        {{ navList.about }}
      </NuxtLink>
      <a
        @click="modeChange(1)"
        v-if="mode"
        href="javascript:void(0);"
        class="it"
      >
        <svg-icon icon-class="route.category"></svg-icon>妙手生花
      </a>
    </nav>
    <MaskDialog
      v-if="mode"
      v-model="show"
      :title="type ? '添加category' : '编辑category'"
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
  name: 'Nav',
  data() {
    return {
      name: null,
      show: false,
      type: 0,
      current: null,
    }
  },
  components: {
    operating: () => import('@/components/operating'),
  },
  computed: {
    ...mapState('common', ['mode', 'lang']),
    ...mapState('category', ['categorys']),
    navList() {
      return this.$t('nav')
    },
  },
  mounted() {
    // console.log(this.navList)
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
        // 新增
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
      &.nuxt-link-active {
        color: $primary;
        background-color: $module-bg;
      }
    }
  }
}
</style>
