# gatsby-source-wix

A Gatsby plugin to pull data from Wix Studio's CMS into Gatsby's GraphQL data layer. This plugin uses the `@wix/sdk` and `@wix/data` libraries to fetch and structure data efficiently.

[![NPM Version](https://img.shields.io/npm/v/gatsby-source-wix.svg)](https://www.npmjs.com/package/gatsby-source-wix)

## Features

- Integrates Wix Studio CMS with Gatsby, making CMS data available in Gatsby’s GraphQL API.
- Supports advanced queries and populates references within collections.

## Installation

Install the plugin using npm or yarn:

```bash
npm install gatsby-source-wix
```

or

```bash
yarn add gatsby-source-wix
```

## Plugin Options

The plugin requires several options to authenticate and query data from your Wix CMS. Here’s a breakdown of each required field:

| Option      | Type     | Required | Description                                                                                                                                                                                                                  |
| ----------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`    | `string` | Yes      | Your Wix API key.                                                                                                                                                                                                            |
| `accountId` | `string` | Yes      | The unique ID of your Wix account.                                                                                                                                                                                           |
| `siteId`    | `string` | Yes      | The unique ID of your Wix site.                                                                                                                                                                                              |
| `queries`   | `array`  | Yes      | Array of query objects for each collection to fetch. Each object should include: <br> - `collectionName` (string): Name of the collection <br> - `references` (array, optional): Names of fields to populate references from |

### Example `queries` Array

The `queries` option takes an array of objects that specify the collections to query and optional references:

```js
queries: [
  {
    collectionName: 'blogPosts',
    references: ['author', 'tags'],
  },
  {
    collectionName: 'projects',
  },
];
```

## How to Obtain API Credentials

To connect your Wix CMS with Gatsby, you’ll need the following credentials:

- **API Key**
- **Account ID**
- **Site ID**

Refer to Wix CMS documentation for step-by-step instructions on obtaining these details.

## Usage

In your `gatsby-config.js`, add `gatsby-source-wix` to your plugins array with the necessary options:

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-wix',
      options: {
        apiKey: 'your-api-key',
        accountId: 'your-account-id',
        siteId: 'your-site-id',
        queries: [
          {
            collectionName: 'blogPosts',
            references: ['author', 'tags'],
          },
          {
            collectionName: 'projects',
          },
        ],
      },
    },
  ],
};
```

## Querying Data

Once the plugin is set up, your Wix CMS data will be available in Gatsby’s GraphQL layer. You can query the data in Gatsby's GraphQL editor by referencing the collection names specified in your configuration.

Here's an example of querying a collection named `blogPosts`:

```graphql
{
  allWixBlogPosts {
    nodes {
      id
      title
      content
      author {
        name
      }
      tags
    }
  }
}
```

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/your-repo/gatsby-source-wix/issues).

---

### License

This project is licensed under the MIT License.
