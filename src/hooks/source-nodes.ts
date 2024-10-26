import type { GatsbyNode } from 'gatsby';

import { createWixClient } from '../config/wix.config';
import { nodeBuilder } from '../utils/node-builder';
import { IPluginOptionsInteral } from '../types';

const sourceNodes: GatsbyNode['sourceNodes'] = async (
  gatsbyApi,
  pluginOptions: IPluginOptionsInteral
) => {
  const { reporter } = gatsbyApi;
  const { queries, apiKey, accountId, siteId } = pluginOptions;

  // 1. Create API client and authenticate with API Key
  const wixClient = createWixClient({
    apiKey,
    accountId,
    siteId,
  });

  // 2. Query the collections whose ids are given by the user of the plugin
  // TODO: take care of pagination
  const requests = queries.map(async query =>
    wixClient.items
      .queryDataItems({
        dataCollectionId: query.collectionName,
        referencedItemOptions: query.references?.map(ref => ({
          fieldName: ref,
        })),
      })
      .find()
  );

  let collections;
  const sourcingTimer = reporter.activityTimer('Fetching data from Wix CMS');
  sourcingTimer.start();

  try {
    collections = await Promise.all(requests);
  } catch (err) {
    console.error(err);
    sourcingTimer.panicOnBuild((err as Error).message);
    return;
  }

  // 3. Create nodes in Gatsby's data layer from the results of the above queries
  collections.forEach((collection, index) => {
    // Do not create nodes for empty collections
    if (!collection.items.length) return;

    sourcingTimer.setStatus(
      `Processing ${queries[index].collectionName} collection with ${collection.length} items`
    );

    for (const document of collection.items) nodeBuilder(gatsbyApi, document);
  });

  console.dir(
    collections.map(c => c.items),
    { depth: null }
  );

  sourcingTimer.setStatus('Data fetched successfully from Wix CMS! 🎉');
  sourcingTimer.end();
};

export default sourceNodes;
