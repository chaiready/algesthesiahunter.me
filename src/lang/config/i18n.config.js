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
    me: {
      zh: '进贤进能',
      en: 'designed by me',
    },
    day: {
      zh: '铢积丝累',
      en: 'baht wire product',
    },
    powered: {
      zh: '由',
      en: 'powered by',
    },
    drive: {
      zh: '强力驱动',
      en: ' ',
    },
    library: {
      zh: 'vue',
      en: 'VUE',
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
      zh: '众里寻他千百度',
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
