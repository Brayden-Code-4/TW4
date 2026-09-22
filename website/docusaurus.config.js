// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TW4',
  tagline: 'A small REST API for documentation tasks',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://brayden-code-4.github.io',
  baseUrl: '/TW4/',

  organizationName: 'Brayden-Code-4',
  projectName: 'TW4',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/Brayden-Code-4/TW4/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'TW4',
        logo: {
          alt: 'TW4',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/Brayden-Code-4/TW4',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Quickstart', to: '/docs/quickstart'},
              {label: 'Installation', to: '/docs/installation'},
              {label: 'User guide', to: '/docs/user-guide'},
            ],
          },
          {
            title: 'Project',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Brayden-Code-4/TW4',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TW4 Authors.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
