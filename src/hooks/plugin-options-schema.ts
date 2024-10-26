import { GatsbyNode } from 'gatsby';

const pluginOptionsSchema: GatsbyNode['pluginOptionsSchema'] = ({ Joi }) =>
  Joi.object({
    apiKey: Joi.string().trim().required(),
    accountId: Joi.string().trim().required(),
    siteId: Joi.string().trim().required(),
    queries: Joi.array()
      .items(
        Joi.object({
          collectionName: Joi.string().trim().required(),
          references: Joi.array().items(Joi.string().trim()).min(1),
        })
      )
      .min(1)
      .required(),
  });

export default pluginOptionsSchema;
