import { products } from './lib/products.js';
import fs from 'fs';

const BASE = 'https://ssmugs.com';
const LANGS = ['en', 'pl'];
const PAGES = ['', '/products', '/oem', '/about', '/faq', '/contact'];

const urls = [];
for (const lang of LANGS) {
  for (const p of PAGES) urls.push(`${BASE}/${lang}${p}`);
  for (const pr of products) urls.push(`${BASE}/${lang}/products/${pr.slug}`);
}

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n') +
  '\n</urlset>\n';

fs.writeFileSync('public/sitemap.xml', xml);
console.log(`sitemap.xml written: ${urls.length} urls`);
