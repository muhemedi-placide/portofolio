import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const origin = 'https://muhemediplacide.lovable.app';
const report = [];

async function get(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(45000),
    headers: { 'User-Agent': 'Mozilla/5.0 Chrome/131.0.0.0 Safari/537.36' },
  });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return response;
}

async function download(url, relativePath, expectedType) {
  const target = resolve(root, relativePath);
  if (!target.startsWith(root + sep)) throw new Error('Invalid destination');
  const response = await get(url);
  const contentType = response.headers.get('content-type') || '';
  if (expectedType && !contentType.includes(expectedType)) {
    throw new Error(`Unexpected content type ${contentType}: ${url}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, bytes);
  report.push({ path: relativePath, url, bytes: bytes.length });
  console.log(`${relativePath}: ${bytes.length} bytes`);
}

const html = await (await get(origin + '/')).text();
const modulePaths = [...new Set(html.match(/\/assets\/[^"'<>\s]+\.js/g) || [])];
const siteModule = modulePaths.find((path) => /\/site-[^/]+\.js$/.test(path));
if (!siteModule) throw new Error('Cannot locate the published content module');
const js = await (await get(origin + siteModule)).text();
const articlePaths = [...new Set(js.match(/\/assets\/(?:ecommerce|entreprise|magasin|maintenance)-[^"'\x60\s\\<>]+\.jpg/g) || [])];
if (articlePaths.length !== 4) throw new Error(`Expected four article images, found ${articlePaths.length}`);
for (const path of articlePaths) {
  const name = path.match(/\/assets\/(ecommerce|entreprise|magasin|maintenance)-/)[1];
  await download(origin + path, `src/assets/articles/${name}.jpg`, 'image/');
}

await download(origin + '/favicon.ico', 'public/favicon.ico', 'image/');

for (const file of await readdir(resolve(root, 'src/assets/gallery'))) {
  if (!file.endsWith('.asset.json')) continue;
  const asset = JSON.parse(await readFile(resolve(root, 'src/assets/gallery', file), 'utf8'));
  if (!asset.url.startsWith('/__l5e/assets-v1/') || asset.url.includes('..')) {
    throw new Error(`Invalid asset URL in ${file}`);
  }
  await download(origin + asset.url, 'public' + asset.url, 'image/');
}

const socialImage = 'https://storage.googleapis.com/gpt-engineer-file-uploads/1vb7WtcK0aUpe8tcjtKD1z2q0ll1/social-images/social-1782369767322-placide_muhemedi_salumu.webp';
await download(socialImage, 'public/images/placide_muhemedi_salumu.webp', 'image/');

const fontsUrl = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap';
let fontCss = await (await get(fontsUrl)).text();
const fontUrls = [...new Set(fontCss.match(/https:\/\/fonts\.gstatic\.com\/[^)\s]+/g) || [])];
if (!fontUrls.length) throw new Error('No font files found');
for (const fontUrl of fontUrls) {
  const file = new URL(fontUrl).pathname.split('/').pop();
  await download(fontUrl, `public/fonts/${file}`);
  fontCss = fontCss.replaceAll(fontUrl, `./${file}`);
}
await writeFile(resolve(root, 'public/fonts/fonts.css'), fontCss);
await mkdir(resolve(root, '.cache'), { recursive: true });
await writeFile(resolve(root, '.cache/import-media-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`Imported ${report.length} media files.`);
