# Interactive Advertising Bureau (IAB) Taxonomies

The [IAB Taxonomies](https://github.com/InteractiveAdvertisingBureau/Taxonomies/) are a set of categories and subcategories for use in advertising. These standards developed by the [IAB Tech Lab](https://iabtechlab.com/standards/) are intended to be used by publishers, ad networks, and other advertisers and marketers to help them understand the types of content and targeting. The standards serve as a foundation for the safe and effective advertising practices.

This repository provides a script with which you can monitor changes in the IAB Taxonomy data, and serves as a primer for downloading the updates and converting the taxonomy data into a JSON format.

## Usage

1. Clone this repository.

    ```sh
    git clone https://github.com/lapinek/iab-taxonomies.git
    ```

1. Navigate to the root folder.

    ```sh
    cd iab-taxonomies
    ```

1. Install dependencies.

    ```sh
    npm install
    ```

3. Run the main script.

    ```sh
    node index.js
    ```

4. Inspect the downloaded data under the [data](./data) folder.

    The downloaded content will be converted into JSON and saved in a `data/iab-taxonomies.json` file, which has the following structure:

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

    If a new commit has been detected since the last download, the corresponding `.tsv` file will be saved under respective `data/<folder-name>`, following the original repository structure:

    `data`

    ```sh
    ├── Ad Product Taxonomies
    │   ├── Ad Product Taxonomy 1.0.tsv
    │   ├── Ad Product Taxonomy 1.1.tsv
    |   └──...
    ├── Audience Taxonomies
    │   ├── Audience Taxonomy 1.0.tsv
    │   └──...
    |──...
    ```

    > Currently, the original taxonomy files are provided with CRLF line endings, but in the repository they are saved with LF endings. Thus, the downloaded files might appear modified in the file system depending on your IDE and Git settings even if there is no changes in the actual data and in the [iab-taxonomies.json](data\iab-taxonomies.json) file.

> Note: GitHub applies rather strict [Rate limits for its REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28). If you decide to develop this script further, you might want to consider forking the Taxonomies repository as well and authenticate GitHub API requests sent to your fork, which should allow for a higher rate limit.