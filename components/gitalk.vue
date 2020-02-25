<template>
  <div id="gitalk-container"></div>
</template>

<script>
import Gitalk from 'gitalk'
import { isProdMode } from '@/config/env'
export default {
  name: 'Gitalk',
  mounted() {
    if (isProdMode) {
      this.initGitalk()
    }
  },
  methods: {
    initGitalk() {
      const gitalk = new Gitalk({
        clientID: '06b5cef9988469ced515',
        clientSecret: '023eace06a9416b02f69ad2dd81dd7969a660aa5',
        repo: 'gitalk.algesthesiahunter',
        owner: 'Algesthesiahunter',
        admin: ['Algesthesiahunter'],
        id: this.$route.params.id,
        distractionFreeMode: false, // Facebook-like distraction free mode
      })
      gitalk.render('gitalk-container')
    },
  },
}
</script>
<style lang="scss">
#gitalk-container {
  a {
    color: $primary !important;
  }
  .gt-container .gt-svg svg {
    fill: $primary !important;
  }
  .gt-container .gt-ico-github svg {
    fill: $theme-black !important;
  }
  .gt-container {
    .gt-user {
      svg {
        fill: $text !important;
      }
    }
    .gt-btn {
      border: 1px solid $primary !important;
      background-color: $primary !important;
    }
    .gt-btn-preview {
      color: $primary !important;
      background-color: $module-bg !important;
    }
    .gt-ico-tip {
      .gt-svg {
        transform: translateY(-1.5px);
      }
    }
  }
  .gt-comment-body.markdown-body {
    font-size: 14px !important;
  }
  .gt-comment {
    img {
      transition: transform 0.5s ease-out;
    }
  }
  .gt-comment-header {
    .gt-svg {
      height: 17px !important;
    }
    .gt-ico {
      display: flex !important;
      height: 100% !important;
    }
  }
}
</style>
