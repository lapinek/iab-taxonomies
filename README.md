# Interactive Advertising Bureau (IAB) Taxonomies

The [IAB Taxonomies](https://github.com/InteractiveAdvertisingBureau/Taxonomies/) are a set of categories and subcategories for use in advertising. These standards developed by the [IAB Tech Lab](https://iabtechlab.com/standards/) are intended to be used by publishers, ad networks, and other advertisers and marketers to help them understand the types of content and targeting. The standards serve as a foundation for the safe and effective advertising practices.

This package can help you monitor changes in IAB Taxonomy data by downloading the data and converting it into a JSON format. 

## Usage

1. Install the package:

    ```sh
    npm install iab-taxonomies
    ```

1. Import the `get` function from the package and use it to download the data.

    ```javascript
    import { get as getIabTaxonomies } from 'iab-taxonomies';
    import fs from 'node:fs';

    const data = await getIabTaxonomies();

    fs.writeFileSync('./iab-taxonomies.json', JSON.stringify(data, null, 2));
    ```

    The `get` function accepts an object as an argument. The following options are available:

    | Option | Description | Default |
    |--------|-------------|---------|
    | param0 | Options for the `get` function | {} |
    | param0.gitHubVersion | Version of the GitHub REST API | '2022-11-28'|
    | param0.repo | The repository name | 'Taxonomies'|
    | param0.owner | The owner of the repository | 'InteractiveAdvertisingBureau'|


    If no arguments are provided, the defaults are used:

    [src/index.js](src/index.js)

    ```javascript
    async function get({
      gitHubVersion = '2022-11-28',
      repo = 'Taxonomies',
      owner = 'InteractiveAdvertisingBureau'
    } = {}) {
      // ...
    }
    ```

1. Inspect the downloaded data.

    The downloaded content will be converted into a JSON file, which has the following structure:

    `iab-taxonomies.json`

    ```json
    {
      "<folder-name>": {
        "<file-name>.tsv": {
          "<commit-hash>": {
            "date": "<commit-date>",
            "records": [
              [
                "<header>",
                ...
              ],
              [
                "<value>",
                ...
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

    For example:

    `data\iab-taxonomies.json`

    ```json
    {
      "Ad Product Taxonomies": {
        "Ad Product Taxonomies/Ad Product Taxonomy 1.0.tsv": {
          "4c7aed478e320fffd68bba3f708ec86f608c8d59": {
            "date": "2023-08-01T14:29:18Z",
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

> GitHub applies rather strict [Rate limits for its REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28). If you decide to develop this package further, you might want to consider forking the Taxonomies repository as and authenticate GitHub API requests sent to your fork, which should allow for a higher rate limit.

## Examples

This repository contains an example script that uses the local copy of the package to download the latest version of the IAB Taxonomies. You can find it under [examples/get-iab-taxonomies](examples/get-iab-taxonomies) folder:

```sh
cd examples/get-iab-taxonomies
```

## License

[MIT](LICENSE)
