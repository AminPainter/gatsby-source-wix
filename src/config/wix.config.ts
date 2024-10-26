import { ApiKeyStrategy, createClient } from '@wix/sdk';
import { items } from '@wix/data';

const createWixClient = ({
  apiKey,
  accountId,
  siteId,
}: {
  apiKey: string;
  accountId: string;
  siteId: string;
}) =>
  createClient({
    modules: { items },
    auth: ApiKeyStrategy({
      apiKey,
      accountId,
      siteId,
    }),
  });

export { createWixClient };
