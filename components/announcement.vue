<template>
  <div class="announcement-container">
    <div class="title">
      <svg-icon
        @click="add"
        :style="{
          transform: `rotate(${rotatedeg * 90}deg)`,
        }"
        icon-class="windmill"
        class="svg"
      ></svg-icon>
    </div>
    <loading-box class="loading" v-if="announcements.length === 0" />
    <template v-else>
      <div class="bg"></div>
      <transition name="module" mode="out-in">
        <div
          key="swiper"
          v-swiper:swiper="swiperOption"
          @transitionStart="handleSwiperTransitionStart"
          class="swiper"
        >
          <div class="swiper-wrapper">
            <div
              :key="index"
              v-for="(it, index) in announcements"
              class="swiper-slide slide-item"
            >
              <operating
                :visible="mode"
                :name="it.name"
                @edit="modeChange(0, it)"
                @submit="ConfirmSubmit(it._id)"
              ></operating>
              <div class="content filter">
                {{ it.content }}
              </div>
              <div class="date">~ {{ it.updatedAt | dateAgo(lang) }}</div>
            </div>
          </div>
        </div>
      </transition>
      <MaskDialog
        v-model="show"
        v-if="mode"
        :title="type ? '添加公告' : '编辑公告'"
        @submit="submit"
      >
        <div class="form">
          <span>内容</span>
          <input v-focus v-model="content" @keyup.enter="submit" type="text" />
        </div>
      </MaskDialog>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Announcement',
  data() {
    return {
      announcements: [],
      content: null,
      show: false,
      type: 0,
      current: null,
      rotatedeg: 0,
      swiperOption: {
        direction: 'vertical',
        loop: true,
        height: 36,
        // autoplay: {
        //   delay: 3500,
        //   disableOnInteraction: false,
        // },
      },
    }
  },
  computed: {
    ...mapState('common', ['mode', 'lang']),
  },
  methods: {
    ...mapActions('announcement', [
      'getAnnouncements',
      'postAnnouncement',
      'deleteAnnouncement',
      'putAnnouncement',
    ]),
    ConfirmSubmit(id) {
      this.deleteAnnouncement(id).then(() => this.init())
    },
    submit() {
      if (this.type) {
        this.postAnnouncement(this.content).then(() => this.init())
        return false
      }
      this.putAnnouncement({
        id: this.current._id,
        params: { content: this.content },
      }).then(() => this.init())
    },
    add() {
      if (this.mode) {
        this.modeChange(1)
      }
    },
    modeChange(type, it) {
      this.show = true
      this.type = type
      if (type === 1) {
        // 新增
        this.content = null
        return false
      }
      // 编辑
      this.content = it.content
      this.current = it
    },
    init() {
      this.content = null
      this.getAnnouncements().then((res) => (this.announcements = res))
    },
    handleSwiperTransitionStart() {
      this.rotatedeg = this.rotatedeg + 1
    },
  },
  components: {
    operating: () => import('@/components/operating'),
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss" scoped>
.announcement-container {
  background-color: $module-bg;
  overflow: hidden;
  height: 36px;
  position: relative;
  .title {
    float: left;
    transform: rotate(45deg);
    transform-origin: center center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .svg {
      width: 60px;
      font-size: 16px;
      transition: all 0.3s;
    }
  }
  .date {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: $text-dividers;
  }
  .filter {
    height: 36px;
    display: flex;
    align-items: center;
  }

  .bg {
    left: 100px;
    position: absolute;
    transform: rotate(-60deg) translateY(-59%);
    opacity: 0.7;
    border-bottom-width: 12px;
    z-index: -1;
    border-bottom-style: solid;
    border-color: #b5b5b5;
    background: linear-gradient(90deg, $theme-black 50%, #b5b5b5 100%);
    padding-bottom: 70%;
    width: 100%;
  }
}
</style>
