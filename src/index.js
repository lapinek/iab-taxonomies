/**
 * The main module.
 * @module iab-taxonomies
 */

import { Octokit } from 'octokit';
import fs from 'node:fs';
import { parse } from 'csv-parse/sync';

const octokit = new Octokit();

async function get({
  gitHubVersion = '2022-11-28',
  repo = 'Taxonomies',
  owner = 'InteractiveAdvertisingBureau'
} = {}) {
  const octokitRequestDefaults = {
    headers: {
      'X-GitHub-Api-Version': gitHubVersion
    }
  };
  octokit.request.defaults(octokitRequestDefaults);

  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(dataFilePath));
  } catch (e) {}

  const contentsResponse = await octokit.request( `GET /repos/${owner}/${repo}/contents`);
  const dirs = contentsResponse.data.filter((content) => content.type === 'dir');

  for (const dir of dirs) {
    data[dir.path] = data[dir.path] || {};

    const contentsResponse = await octokit.request(`GET ${dir.url}`);

    const tsvFiles = contentsResponse.data.filter((content) => {
      return content.type === 'file' && content.name.endsWith('.tsv');
    });

    for (const tsvFile of tsvFiles) {
      data[dir.path][tsvFile.path] = data[dir.path][tsvFile.path] || {};

      const commit = await octokit.request(`GET /repos/${owner}/${repo}/commits?path=${encodeURIComponent(tsvFile.path)}&page=1&per_page=1`);

      if (!data[dir.path][tsvFile.path][commit.data[0].sha]) {
        data[dir.path][tsvFile.path][commit.data[0].sha] = {};
        data[dir.path][tsvFile.path][commit.data[0].sha].date = commit.data[0].commit.committer.date;
        data[dir.path][tsvFile.path][commit.data[0].sha].download_url = tsvFile.download_url;

        const content = await octokit.request(`GET ${tsvFile.download_url}`);
        const records = parse(content.data, {
          bom: false,
          delimiter: '\t'
        });
        data[dir.path][tsvFile.path][commit.data[0].sha].records = records;
      }
    }
  }

  return data;
}

export { get };
