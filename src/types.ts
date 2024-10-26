import { PluginOptions as GatsbyDefaultPluginOptions, IPluginRefOptions } from 'gatsby';

interface IBasePluginOptions {
  apiKey: string;
  accountId: string;
  siteId: string;
  queries: [
    {
      collectionName: string;
      references?: [string];
    }
  ];
}

export interface IPluginOptionsInteral extends IBasePluginOptions, GatsbyDefaultPluginOptions {}
export interface IPluginOptions extends IBasePluginOptions, IPluginRefOptions {}
