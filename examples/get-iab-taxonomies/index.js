import { get as getIabTaxonomies } from '../../src/index.js';
import fs from 'node:fs';

const data = await getIabTaxonomies();

fs.writeFileSync('./data/iab-taxonomies.json', JSON.stringify(data, null, 2));
