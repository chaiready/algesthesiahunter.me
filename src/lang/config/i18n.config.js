export let source = {
  languages: {
    zh: 'ZH',
    en: 'EN',
  },
  nav: {
    home: {
      zh: '天外天',
      en: 'home',
    },
    think: {
      zh: '超世拔俗',
      en: 'think',
    },
    coding: {
      zh: '虚室上白',
      en: 'coding',
    },
    project: {
      zh: '八窗玲珑',
      en: 'project',
    },
    vlog: {
      zh: '止于至善',
      en: 'vlog',
    },
    about: {
      zh: '明月芦花',
      en: 'about',
    },
    guestbook: {
      zh: '海纳百川',
      en: 'guestbook',
    },
  },
  footer: {
    design: {
      zh: ' ',
      en: 'Design by',
    },
    me: {
      zh: '寻踪觅迹',
      en: 'Algesthesiahunter',
    },
    powered: {
      zh: '由',
      en: 'Powered by',
    },
    and: {
      zh: '和 春风雨露',
      en: 'and Sweat',
    },
    drive: {
      zh: '强力驱动',
      en: ' ',
    },
    library: {
      zh: 'Vue',
      en: 'Vue',
    },
  },
  tag: {
    shell: {
      zh: 'shell',
      en: 'shell',
    },
    webpack: {
      zh: 'webpack',
      en: 'webpack',
    },
    fealing: {
      zh: '思索',
      en: 'fealing',
    },
    vue: {
      zh: 'vue',
      en: 'vue',
    },
    javascript: {
      zh: 'javascript',
      en: 'javascript',
    },
  },
  text: {
    origin: {
      original: {
        zh: '原创',
        en: 'og',
      },
      reprint: {
        zh: '转载',
        en: 'rp',
      },
      hybrid: {
        zh: ' 混撰',
        en: 'hb',
      },
    },
    slogan: {
      zh: '砥砺前行，未来可期',
      en: 'Forge ahead, the future can be expected.',
    },
    category: {
      name: {
        zh: '分门别类',
        en: 'Categories',
      },
      empty: {
        zh: '未分类',
        en: 'no cate',
      },
    },
    search: {
      zh: '众里寻她千百度',
      en: 'Search...',
    },
    hot: {
      zh: '群贤毕至',
      en: 'hot',
    },
  },
}
let resObj = {
  en: {},
  zh: {},
}
function judge(res, obj, type) {
  for (const k in obj) {
    let v = obj[k]
    if (typeof v !== 'string' && !v[type]) {
      res[k] = {}
      judge(res[k], v, type)
    } else {
      res[k] = v[type]
    }
  }
}
function formatData(obj) {
  Object.keys(resObj).forEach(v => {
    judge(resObj[v], obj, v)
  })
}
formatData(source)
export default resObj
