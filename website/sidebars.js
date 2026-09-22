// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'quickstart',
    'installation',
    'user-guide',
    {
      type: 'category',
      label: 'Developer guide',
      items: [
        'developer/overview',
        'developer/integrate',
        'developer/configure',
        'developer/code-reference',
        'developer/extend',
        'developer/writers',
      ],
    },
  ],
};

export default sidebars;
