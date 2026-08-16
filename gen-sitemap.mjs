import { products } from './lib/products.js';
import { productImages } from './lib/productImages.js';
import { guides } from './lib/guides.js';
import fs from 'fs';

const BASE = 'https://ssmugs.com';
const LANGS = ['en', 'pl'];
const PAGES = ['', '/products', '/oem', '/about', '/guides', '/faq', '/contact'];

function urlEntry(loc, image) {
  let s = `  <url><loc>${loc}</loc>`;
  if (image) s += `<image:image><image:loc>${BASE}${image}</image:loc></image:image>`;
  s += '</url>';
  return s;
}

const urls = [];
for (const lang of LANGS) {
  for (const p of PAGES) urls.push(urlEntry(`${BASE}/${lang}${p}`));
  for (const pr of products) {
    const img = productImages[pr.name] || null;
    urls.push(urlEntry(`${BASE}/${lang}/products/${pr.slug}`, img));
  }
  for (const g of guides) {
    urls.push(urlEntry(`${BASE}/${lang}/guides/${g.slug}`));
  }
}

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
  'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
  urls.join('\n') +
  '\n</urlset>\n';

fs.writeFileSync('public/sitemap.xml', xml);
console.log(`sitemap.xml written: ${urls.length} urls (with product images)`);
