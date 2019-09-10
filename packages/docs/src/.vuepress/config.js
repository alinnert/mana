module.exports = {
  title: 'Mana [WIP]',
  base: '/mana/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.png', sizes: '16x16' }]
  ],

  themeConfig: {
    repo: 'alinnert/mana',

    nav: [
      { text: 'Introduction', link: '/introduction/' },
      { text: 'Packages', items: [
        { text: 'Overview', link: '/packages/' },
        { text: 'Available Packages', items: [
          { text: 'Core', link: '/packages/core/' },
          { text: 'Controllers', link: '/packages/controllers/' },
          { text: 'Attributes', link: '/packages/attributes/' },
          { text: 'Utils', link: '/packages/utils/' },
        ] },
      ] },
    ],

    sidebar: {
      '/introduction': [
        {
          title: 'Introduction',
          collapsable: false,
          children: [
            '/introduction/',
          ]
        }
      ],
      '/packages/core': [
        {
          title: 'Package "core"',
          collapsable: false,
          children: [
            '/packages/core/',
          ]
        },
      ],
      '/packages/controllers': [
        {
          title: 'Package "controllers"',
          collapsable: false,
          children: [
            '/packages/controllers/',
            '/packages/controllers/controllers',
            '/packages/controllers/templates',
            '/packages/controllers/instance-scope',
          ]
        },
      ],
      '/packages/attributes': [
        {
          title: 'Package "attributes"',
          collapsable: false,
          children: [
            '/packages/attributes/',
            '/packages/attributes/create-own',
          ]
        },
      ],
      '/packages/utils': [
        {
          title: 'Package "utils"',
          collapsable: false,
          children: [
            '/packages/utils/',
          ]
        },
      ]
    }
  }
}