import { NodeInput, SourceNodesArgs } from 'gatsby';
import { DataItem as WixDataItem } from '@wix/data_items';

export function nodeBuilder(gatsbyApi: SourceNodesArgs, input: WixDataItem) {
  const data = input.data!;
  const dataCollectionId = input.dataCollectionId!;
  const id = input._id!;

  const nodeId = gatsbyApi.createNodeId(`wix-${input.dataCollectionId}-${id}`);

  const node = {
    ...input.data,
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: `Wix${dataCollectionId}`,
      contentDigest: gatsbyApi.createContentDigest(data),
    },
  } satisfies NodeInput;

  gatsbyApi.actions.createNode(node);
}
