export const source = {
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
      zh: '实验室',
      en: 'project',
    },
    about: {
      zh: '狂浪生',
      en: 'about',
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
    nuxt: {
      zh: 'Nuxt',
      en: 'Nuxt',
    },
    nest: {
      zh: 'Nest',
      en: 'Nest',
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
    algorithm: {
      zh: '算法',
      en: 'algorithm',
    },
    css: {
      zh: 'css',
      en: 'css',
    },
    nodejs: {
      zh: 'nodejs',
      en: 'nodejs',
    },
    react: {
      zh: 'react',
      en: 'react',
    },
    linux: {
      zh: 'linux',
      en: 'linux',
    },
    mac: {
      zh: 'mac',
      en: 'mac',
    },
    docker: {
      zh: 'docker',
      en: 'docker',
    },
    github: {
      zh: 'github',
      en: 'github',
    },
    git: {
      zh: 'git',
      en: 'git',
    },
    security: {
      zh: '安全',
      en: 'security',
    },
    life: {
      zh: '生活',
      en: 'life',
    },
    learn: {
      zh: '学习',
      en: 'learn',
    },
    network: {
      zh: '网络',
      en: 'network',
    },
    optimization: {
      zh: '优化',
      en: 'optimization',
    },
    typescript: {
      zh: 'typescript',
      en: 'typescript',
    },
    tool: {
      zh: '工具',
      en: 'tool',
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
        zh: '混撰',
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

const config = {
  en: {},
  zh: {},
}
function judge(res, obj, type) {
  for (const k in obj) {
    const v = obj[k]
    if (typeof v !== 'string' && !v[type]) {
      res[k] = {}
      judge(res[k], v, type)
    } else {
      res[k] = v[type]
    }
  }
}
function formatData(obj) {
  Object.keys(config).forEach((v) => {
    judge(config[v], obj, v)
  })
}
formatData(source)

export const i18nConfig = config
