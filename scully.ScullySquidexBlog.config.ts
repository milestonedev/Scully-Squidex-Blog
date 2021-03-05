import { ScullyConfig } from '@scullyio/scully';
import { squidexPostSlugs } from './scully/plugins/plugin';
export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'ScullySquidexBlog',
  outDir: './dist/static',
  routes: {
    '/blog/:postSlug':{
      type: squidexPostSlugs,
    }
  }
};
