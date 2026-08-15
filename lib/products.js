// Normalized product catalog for ssmugs.com
// Source: 产品箱规重量(1).xlsx (factory specs & ex-work prices)
// Prices are ex-work RMB (¥) per piece, for reference / quote basis only.

import { productImages } from './productImages.js';

const STYLE = {
  pastoral:   { zh: '田园',      en: 'Pastoral',      pl: 'Rustykalny' },
  straight:   { zh: '直杯',      en: 'Straight',      pl: 'Prosty' },
  diamond:    { zh: '菱形',      en: 'Diamond',       pl: 'Romb' },
  gourd:      { zh: '葫芦',      en: 'Gourd',         pl: 'Dyniowy' },
  milk:       { zh: '牛奶瓶',    en: 'Milk Bottle',   pl: 'Butelka Mleczna' },
  cola:       { zh: '可乐瓶',    en: 'Cola Bottle',   pl: 'Butelka Cola' },
  belly:      { zh: '大肚杯',    en: 'Round Tumbler', pl: 'Kubek Okrągły' },
  narrow:     { zh: '小口瓶',    en: 'Narrow-mouth',  pl: 'Wąskoustna' },
  singlewall: { zh: '单层压底',  en: 'Single-wall',   pl: 'Jednościenna' },
  vacuum:     { zh: '真空',      en: 'Vacuum',        pl: 'Próżniowa' },
  wide:       { zh: '美式大口',  en: 'Wide-mouth',    pl: 'Szerokoustna' },
  car:        { zh: '汽车杯',    en: 'Car Cup',       pl: 'Kubek Samochodowy' },
  lid:        { zh: '塑料盖',    en: 'Plastic Lid',   pl: 'Pokrywka' },
  can:        { zh: '易拉罐',    en: 'Can-style',     pl: 'Puszkowa' },
  coffee:     { zh: '咖啡杯',    en: 'Coffee Cup',    pl: 'Kubek Kawowy' },
  egg:        { zh: '蛋杯',      en: 'Egg Cup',       pl: 'Kubek Jajkowy' },
  temp:       { zh: '温度杯',    en: 'Temp-display',  pl: 'z Termometrem' },
  threein1:   { zh: '一杯三盖',  en: '3-in-1 Lid',    pl: '3-pokrywki' },
  bullet:     { zh: '子弹头',    en: 'Bullet',         pl: 'Pociskowy' },
  waist:      { zh: '小蛮腰',    en: 'Slim Waist',     pl: 'Wąska Talia' },
};

// English / Polish product "type" word for SEO titles (Bottle/Cup/Tumbler/Lid)
const TYPE_EN = {
  pastoral:'Bottle', straight:'Bottle', diamond:'Bottle', gourd:'Bottle', milk:'Bottle', cola:'Bottle',
  belly:'Tumbler', narrow:'Bottle', singlewall:'Bottle', vacuum:'Bottle', wide:'Bottle', bullet:'Bottle',
  waist:'Bottle', can:'Can Bottle', coffee:'Coffee Cup', egg:'Egg Cup', car:'Car Cup',
  threein1:'3-in-1 Bottle', lid:'Bottle Lid',
};
const TYPE_PL = {
  pastoral:'Butelka', straight:'Butelka', diamond:'Butelka', gourd:'Butelka', milk:'Butelka', cola:'Butelka',
  belly:'Kubek', narrow:'Butelka', singlewall:'Butelka', vacuum:'Butelka', wide:'Butelka', bullet:'Butelka',
  waist:'Butelka', can:'Butelka Puszkowa', coffee:'Kubek Kawowy', egg:'Kubek Jajkowy', car:'Kubek Samochodowy',
  threein1:'Butelka 3-w-1', lid:'Pokrywka',
};

// Styles whose English/Polish label already contains the product type word
// (e.g. "Car Cup", "Coffee Cup") — we override to avoid "Car Cup Car Cup".
const SEO_NAME_OVERRIDE = {
  lid:      { en: (c) => `${c}Stainless Steel Bottle Lid`,          pl: (c) => `${c}Stal Nierdzewna Pokrywka do Butelki` },
  car:      { en: (c) => `${c}Stainless Steel Car Cup`,             pl: (c) => `${c}Stal Nierdzewna Kubek Samochodowy` },
  coffee:   { en: (c) => `${c}Stainless Steel Coffee Cup`,          pl: (c) => `${c}Stal Nierdzewna Kubek Kawowy` },
  egg:      { en: (c) => `${c}Stainless Steel Egg Cup`,             pl: (c) => `${c}Stal Nierdzewna Kubek Jajkowy` },
  threein1: { en: (c) => `${c}Stainless Steel 3-in-1 Bottle`,       pl: (c) => `${c}Stal Nierdzewna Butelka 3-w-1` },
};

// Build SEO-optimized name / meta title / meta description for a product (EN + PL)
function buildSeo(p) {
  const cap = p.capacityMl ? `${p.capacityMl}ml ` : '';
  const ov = SEO_NAME_OVERRIDE[p.styleKey];
  const enName = ov
    ? ov.en(cap)
    : `${cap}Stainless Steel ${p.style.en} ${TYPE_EN[p.styleKey] || 'Bottle'}`.trim();
  const plName = ov
    ? ov.pl(cap)
    : `${cap}Stal Nierdzewna ${p.style.pl} ${TYPE_PL[p.styleKey] || 'Butelka'}`.trim();
  const enTitle = `${enName} | Wholesale B2B China Factory Direct`;
  const plTitle = `${plName} | Hurtownia B2B Fabryka Chiny`;
  const enDesc = `Wholesale ${enName.toLowerCase()} from China factory. Direct sale, OEM/ODM custom logo, B2B bulk supply, low MOQ, fast delivery.`;
  const plDesc = `Hurtowa ${plName.toLowerCase()} z fabryki w Chinach. Bezpośrednia sprzedaż, OEM/ODM, logo na zamówienie, B2B, niskie MOQ.`;
  return {
    en: { name: enName, title: enTitle, desc: enDesc },
    pl: { name: plName, title: plTitle, desc: plDesc },
  };
}

// capacity buckets for filtering
function bucket(ml) {
  if (ml == null) return 'other';
  if (ml <= 350) return '350ml';
  if (ml <= 500) return '500ml';
  if (ml <= 600) return '600ml';
  if (ml <= 750) return '750ml';
  return '1000ml+';
}

// raw rows: [name, capacity, styleKey, unitWeightG, gwKg, nwKg, pcsPerCarton, meas, whiteBox, unitPrice]
const RAW = [
  ['500田园', 500, 'pastoral', 132, 10.5, 9, 60, '69*42*26', '6.6*24', 4.8],
  ['750田园', 750, 'pastoral', 156, 12.5, 11, 60, '78*47*27.5', '7.5*26', 4.9],
  ['1000田园', 1000, 'pastoral', null, 15, 13.5, 60, '78*47*33', '7.5*31.5', 5],
  ['500直杯', 500, 'straight', null, 9, 8, 60, '78*47*21.5', '7.5*19.5', 4.6],
  ['750直杯', 750, 'straight', null, 12, 11, 60, '78*47*26', '7.4*24', 4.7],
  ['1000直杯', 1000, 'straight', null, 13, 12, 60, '78*47*31', '7.5*29', 4.8],
  ['750菱形', 750, 'diamond', null, 12, 11, 60, '78*47*26', '7.4/24', 5],
  ['1000菱形', 1000, 'diamond', null, 13, 12, 60, '78*47*31', '7.5*29', 5.2],
  ['750葫芦', 750, 'gourd', null, 13, 11.5, 60, '78*47*27.5', '7.5*26', 4.8],
  ['1000葫芦', 1000, 'gourd', null, 15, 14, 60, '83*50*30', '8*28.4', 5],
  ['750牛奶瓶', 750, 'milk', null, 12, 11, 60, '78*47*27.5', '7.5*26', 4.8],
  ['1000牛奶瓶', 1000, 'milk', null, 13.5, 12.5, 60, '78*47*31', '7.5*29', 5],
  ['750平底可乐瓶', 750, 'cola', null, null, null, 60, '78*47*29.5', '7.5*27.5', 4.8],
  ['1000平底可乐瓶', 1000, 'cola', null, 13.5, 12.5, 60, '78*47*33', '7.5*31.5', 5],
  ['1000大肚杯', 1000, 'belly', null, 14.5, 13, 60, '83*50*30', '8.*28.4', 5],
  ['直杯塑料盖', null, 'lid', 165.4, 13.5, 12.5, 60, '80*50*28', '7.8*26', 5.8],
  ['腰型塑料盖', null, 'lid', null, 12.5, 11, 60, '78*47*29.5', '7.5*27.5', 5.8],
  ['美式葫芦杯', null, 'gourd', null, null, null, 60, '78*47*29.5', '7.5*27.5', 5.8],
  ['1000单层压底可乐瓶', 1000, 'singlewall', null, 13.8, 12.8, 50, '85*43*33', '8.3*31.5', 7.5],
  ['750单层压底可乐瓶', 750, 'singlewall', 157, 12.5, 11.5, 60, '78*47*29.5', '7.5*27.5', 6.5],
  ['500单层压底可乐瓶', 500, 'singlewall', null, 12, 11, 60, '78*47*26', '7.5*24', 6],
  ['500小口瓶', 500, 'narrow', null, null, null, 60, '77*46.5*19.5', '7.4*17.5', 5.5],
  ['750小口瓶', 750, 'narrow', null, 12, 11, 60, '77*46.5*25.5', '7.4*22.5', 5.8],
  ['易拉罐', null, 'can', null, 15.5, 14, 60, '47*39.5*41', '7.5*19.5', 5.8],
  ['咖啡杯', null, 'coffee', null, 13.5, 12.5, 50, '83*42*19.5', '7.4*19.5', 10],
  ['蛋杯', null, 'egg', 187.6, 10.5, 9, 50, '47*47*26', '9.1*12.5', 7.8],
  ['350美式大口', 350, 'wide', null, 13.5, 12, 50, '78*39.5*21.5', '7.5*19.5', 12],
  ['500美式大口', 500, 'wide', null, 15.5, 14, 50, '78*39.5*26', '7.5*24', 13],
  ['600美式大口', 600, 'wide', null, 17.5, 15, 50, '78*39.5*27.5', '7.5*26', 14],
  ['750美式大口', 750, 'wide', null, 17.5, 15, 40, '67*42*30', '8*28.4', 16],
  ['500真空可乐瓶', 500, 'vacuum', null, 16, 15, 50, '77.5*38*28.5', '7.5*26.8', 9.5],
  ['750真空可乐瓶', 750, 'vacuum', null, null, null, 60, '78*47*29.5', '7.5*27.5', null],
  ['1000真空可乐瓶', 1000, 'vacuum', null, null, null, 30, '55*46*36.5', '8.5*33.4', 15],
  ['3代4.0汽车杯', null, 'car', null, 16, 15, 25, '79*57.5*29.5', '110*27.7', 15],
  ['2代4.0汽车杯', null, 'car', null, 16, 15, 25, '79*57.5*29.5', '110*27.7', 14],
  ['1代4.0汽车杯', null, 'car', null, 16, 15, 25, '79*57.5*29.5', '110*27.7', 13],
  ['一杯三盖', null, 'threein1', null, 10.5, 9, 24, '57.5*44*26.5', null, null],
  ['温度杯', null, 'temp', null, null, null, 50, '71.5*35*25', '7.4*24', null],
  // extra products present in the source file (with images) but missing spec rows
  ['350子弹头', 350, 'bullet', null, null, null, null, null, null, null],
  ['500子弹头', 500, 'bullet', null, null, null, null, null, null, null],
  ['1000子弹头', 1000, 'bullet', null, null, null, null, null, null, null],
  ['750小蛮腰', 750, 'waist', null, null, null, null, null, null, null],
  ['500小蛮腰', 500, 'waist', null, null, null, null, null, null, null],
];

export const products = RAW.map((r, i) => {
  const [name, capacityMl, styleKey, unitWeightG, gwKg, nwKg, pcsPerCarton, meas, whiteBox, unitPrice] = r;
  const style = STYLE[styleKey];
  const slug = `${capacityMl || 'x'}-${styleKey}-${i + 1}`;
  const base = {
    slug,
    name,
    styleKey,
    capacityMl,
    capacityBucket: bucket(capacityMl),
    style,
    unitWeightG,
    gwKg,
    nwKg,
    pcsPerCarton,
    meas,
    whiteBox,
    unitPrice,
    image: productImages[name] || null,
  };
  base.seo = buildSeo(base);
  return base;
});

export const capacityBuckets = ['350ml', '500ml', '600ml', '750ml', '1000ml+', 'other'];

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}
