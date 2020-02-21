<template>
  <div class="about-page">
    <div class="block">
      <div class="its">
        <div class="content">
          <div class="it">
            <svg-icon icon-class="about" class="icon about"></svg-icon>
            <div>爱我的人和我爱的人对美好生活的向往，就是我的奋斗目标</div>
          </div>
          <div class="it">
            <svg-icon icon-class="like" class="icon like"></svg-icon>
            <div>指弹、coding、骑行、长跑、音乐、DOTA2、孤独</div>
          </div>
          <div class="it">
            <svg-icon icon-class="skill" class="icon skill"></svg-icon>
            <div>Vue、React、Nodejs...</div>
          </div>
          <div class="it">
            <svg-icon icon-class="tag" class="icon"></svg-icon>
            <div>
              指弹爱好者、骑行爱好者、技术爱好者、灵韵爱好者、二次元爱好者
            </div>
          </div>
          <div class="it">
            <svg-icon icon-class="address" class="icon address"></svg-icon>
            <div>中国·深圳·南山区·西丽</div>
          </div>
          <div class="it">
            <svg-icon icon-class="contact" class="icon"></svg-icon>
            <div class="contact-icon">
              <a href="https://github.com/Algesthesiahunter" target="_blink">
                <svg-icon icon-class="github" class="icon github"></svg-icon>
              </a>
              <a href="mailto:541877028@qq.com">
                <svg-icon icon-class="email" class="icon email"></svg-icon>
              </a>
              <a
                href="https://music.163.com/#/user/home?id=254297130"
                target="_blink"
              >
                <svg-icon icon-class="m.163" class="icon m-163"></svg-icon>
              </a>
            </div>
          </div>
          <div class="it">
            <svg-icon icon-class="friend" class="icon friend"></svg-icon>
            <div class="firend-name">
              <a href="http://futuretea.cnblogs.com" target="_blink"
                >「 futuretea 」</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="its">
        <div class="me">
          <img :src="getImgUrl('me.png')" class="avatar" alt />
          <div class="name">
            <h2>霜末之冬</h2>
          </div>
          <div>A web front-end developer</div>
          <div class="find">众里寻他</div>
          <img :src="getImgUrl('weixin.png')" class="wx" alt />
        </div>
      </div>
    </div>
    <div class="block map-container" v-if="mapShow">
      <iframe src="/html/map.html" class="map-iframe"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  head(app) {
    return {
      title: `${this.$store.state.common.title}`,
    }
  },
  data() {
    return {
      mapShow: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.mapShow = true
    }, 500)
  },
}
</script>
<style lang="scss" scoped>
.about-page {
  width: 100%;
  padding-left: 16px;
  .me {
    margin-top: 60px;
    padding-bottom: 60px;
    padding-left: 16px;
    padding-right: 16px;
    width: 240px;
    text-align: center;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    &:hover {
      .avatar {
        transform: rotate(360deg);
      }
      .wx {
        opacity: 1;
        visibility: visible;
      }
    }
    .name {
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      font-size: 18px;
      margin: 18px;
      .des {
        margin-top: 6px;
        margin-bottom: 14px;
      }
      .logo {
        font-size: 22px;
        margin-top: -1px;
      }
    }
    .find {
      margin-top: 34px;
      width: 135px;
      height: 32px;
      line-height: 32px;
      border: 1px solid $primary;
      color: $primary;
    }
    .avatar {
      width: 100px;
      border-radius: 50%;
      border: 4px solid $module-bg;
    }
    .wx {
      position: absolute;
      bottom: 0;
      width: 100%;
      opacity: 0;
      visibility: hidden;
    }
  }
  .its {
    font-size: 14px;
    border-radius: 2px;
    background-color: $module-bg;
    margin-right: 12px;
  }
  .content {
    padding: 16px 24px;
    width: 620px;
  }
  .block {
    margin: 16px;
    display: flex;
    .it {
      margin: 24px 0;
      padding: 0 12px;
      display: flex;
      align-items: center;
      .icon {
        font-size: 17px;
        margin-right: 22px;
      }
      .address {
        color: lightseagreen;
      }
      .about {
        color: deepskyblue;
      }
      .skill {
        color: #f78e3d;
      }
      .like {
        color: red;
      }
      .friend {
        color: #4caf50;
      }
    }
    .firend-name {
      display: flex;
      align-items: center;
      text-transform: capitalize;
    }
    .contact-icon {
      .github {
        &:hover {
          color: black;
        }
      }
      .email {
        &:hover {
          color: lightskyblue;
        }
      }
      .m-163 {
        &:hover {
          color: red;
        }
      }
    }
  }
  .map-container {
    height: 340px;
    width: 900px;
    overflow: hidden;
    .map-iframe {
      padding-right: 28px;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
