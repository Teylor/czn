import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

export async function downloadImage(url: string, destPath: string): Promise<void> {
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);

    protocol.get(url, (response) => {
      const statusCode = response.statusCode || 0;

      // Handle redirects
      if ([301, 302, 307, 308].includes(statusCode)) {
        file.close();
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          const fullRedirectUrl = redirectUrl.startsWith('http')
            ? redirectUrl
            : new URL(redirectUrl, url).href;
          downloadImage(fullRedirectUrl, destPath).then(resolve).catch(reject);
          return;
        }
      }

      // Check for successful response
      if (statusCode < 200 || statusCode >= 300) {
        file.close();
        fs.unlink(destPath, () => {});
        reject(new Error(`HTTP ${statusCode} for ${url}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
      file.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}
