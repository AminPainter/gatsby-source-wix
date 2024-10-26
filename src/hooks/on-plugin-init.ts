import type { GatsbyNode } from 'gatsby';

const onPluginInit: GatsbyNode[`onPluginInit`] = ({ reporter }) => {
  reporter.info('gatsby-source-wix loaded 🟣🟣🟣🟣🟣🟣');
};

export default onPluginInit;
