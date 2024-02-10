import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

export const downloadFile = (url, filePath) => {
  const dirPath = path.parse(filePath).dir;

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const file = fs.createWriteStream('./' + filePath);
  https.get(url, function (response) {
    response.pipe(file);

    /**
     * Close filestream after download completed.
     */
    file.on('finish', () => {
      file.close();
    });

    file.on('error', (err) => {
      console.log(`Error downloading ${url}.`);
    });
  });
};
