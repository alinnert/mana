module.exports = {
  title: 'Mana [WIP]',
  base: '/mana/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.png', sizes: '16x16' }]
  ],

  themeConfig: {
    repo: 'alinnert/mana',

    nav: [
      { text: 'About', link: '/about/' },
      { text: 'Documentation', link: '/docs/' },
    ],

    sidebar: {
      '/docs/': [
        {
          title: 'Introduction',
          collapsable: false,
          children: [
            '/docs/'
          ]
        },
        {
          title: 'Package "core"',
          collapsable: false,
          children: [
            '/docs/core/',
          ]
        },
        {
          title: 'Package "attributes"',
          collapsable: false,
          children: [
            '/docs/attributes/',
            '/docs/attributes/create-own',
          ]
        },
        {
          title: 'Package "controllers"',
          collapsable: false,
          children: [
            '/docs/controllers/',
            '/docs/controllers/controllers',
            '/docs/controllers/templates',
            '/docs/controllers/instance-scope',
          ]
        }
      ]
    }
  }
}