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
        { text: 'Overview', link: '/packages/overview' },
        { text: 'Available Packages', items: [
          { text: 'Core', link: '/packages/core/' },
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