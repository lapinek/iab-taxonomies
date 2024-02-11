# Example Use of the `iab-taxonomy` Package

1. Run the example:

    ```sh
    node index.js
    ```

    This will attempt to download the latest version of the IAB Taxonomies and save it under the [data](./data) folder. Any existing data will be preserved:

    [index.js](index.js)
    ```javascript
    import { get as getIabTaxonomies } from '../../src/index.js';
    import fs from 'node:fs';

    const data = await getIabTaxonomies();

    fs.writeFileSync('./data/iab-taxonomies.json', JSON.stringify(data, null, 2));
    ```

    The `getIabTaxonomies()` accepts an object as an argument. This object can be used to override the default options:

    [../../src/index.js](../../src/index.js)
    ```javascript
    async function get({
      gitHubVersion = '2022-11-28',
      repo = 'Taxonomies',
      owner = 'InteractiveAdvertisingBureau'
    } = {}) {
      // ...
    }
    ```

1. Navigate to [data](./data) folder and inspect the downloaded data:

    [data/iab-taxonomies.json](./data/iab-taxonomies.json)

    ```json
    {
      "Ad Product Taxonomies": {
        "Ad Product Taxonomies/Ad Product Taxonomy 1.0.tsv": {
          "4c7aed478e320fffd68bba3f708ec86f608c8d59": {
            "date": "2023-08-01T14:29:18Z",
            "download_url": "https://raw.githubusercontent.com/InteractiveAdvertisingBureau/Taxonomies/main/Ad%20Product%20Taxonomies/Ad%20Product%20Taxonomy%201.0.tsv",
            "records": [
              [
                "Unique ID",
                "Parent ID",
                "Name",
                "Tier 1",
                "Tier 2",
                "Tier 3",
                "Tier 4",
                "Tier 5"
              ],
              [
                "1",
                "",
                "Apps",
                "Apps",
                "",
                "",
                "",
                ""
              ],
              ...
            ]
          }
        },
        ...
      },
      ...
    }
    ```

    Note that there could be multiple folders (currently four), multiple `.tsv` files in a folder, and multiple versions of a `.tsv` file when new commits are posted. The script will always download the latest commit, but it won't remove the older ones from the existing data, so you can compare with the previous versions. 

    You can sort, filter, or modify the data according to your needs. You can also use the download links to download the data directly from GitHub.
