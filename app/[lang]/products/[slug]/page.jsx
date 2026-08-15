import Link from 'next/link';
import { dict } from '../../../../lib/i18n';
import { products, getProduct } from '../../../../lib/products';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProduct(params.slug);
  if (!p) return { title: 'Product not found' };
  const lang = params.lang === 'pl' ? 'pl' : 'en';
  const seo = p.seo[lang];
  return {
    title: seo.title,
    description: seo.desc,
    alternates: {
      languages: { en: `/en/products/${p.slug}`, pl: `/pl/products/${p.slug}` },
    },
  };
}

export default function ProductDetail({ params }) {
  const lang = params.lang;
  const d = dict[lang] || dict.en;
  const p = getProduct(params.slug);
  if (!p) return <div className="container section">Product not found.</div>;
  const det = d.detail;
  const base = `/${lang}`;
  const seo = p.seo[lang] || p.seo.en;
  const rows = [
    [det.material, det.materialVal],
    [det.singleWeight, p.unitWeightG != null ? `${p.unitWeightG} g` : '—'],
    [det.capacity, p.capacityMl ? `${p.capacityMl} ml` : '—'],
    [det.series, p.style[lang]],
    [det.pcsPerCarton, p.pcsPerCarton],
    [det.gw, p.gwKg != null ? `${p.gwKg} kg` : '—'],
    [det.nw, p.nwKg != null ? `${p.nwKg} kg` : '—'],
    [det.meas, p.meas],
    [det.whiteBox, p.whiteBox || '—'],
    [det.unitPrice, p.unitPrice != null ? `¥${p.unitPrice} / pc` : det.onRequest],
  ];

  // Product structured data (JSON-LD) for rich results / SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: seo.name,
    description: seo.desc,
    image: p.image ? [`https://ssmugs.com${p.image}`] : [],
    brand: { '@type': 'Brand', name: 'SS Mugs' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CNY',
      price: p.unitPrice != null ? p.unitPrice : undefined,
      availability: 'https://schema.org/InStock',
      url: `https://ssmugs.com/${lang}/products/${p.slug}`,
      seller: { '@type': 'Organization', name: 'SS Mugs' },
    },
  };

  // Breadcrumb trail (helps crawlers & AI engines understand site structure)
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: d.nav.home, item: `https://ssmugs.com/${lang}` },
      { '@type': 'ListItem', position: 2, name: d.nav.products, item: `https://ssmugs.com/${lang}/products` },
      { '@type': 'ListItem', position: 3, name: seo.name, item: `https://ssmugs.com/${lang}/products/${p.slug}` },
    ],
  };

  // GEO-friendly plain-language description (citable by AI answer engines)
  const geoDesc =
    `${seo.name} is a ${det.materialVal.toLowerCase()} drinkware manufactured by SS Mugs, ` +
    `a China stainless steel bottle factory. Available for OEM/ODM wholesale with custom logo, ` +
    `low MOQ and a 7–15 day lead time.` +
    (p.capacityMl ? ` Capacity ${p.capacityMl}ml.` : '') +
    (p.pcsPerCarton ? ` ${p.pcsPerCarton} pcs per carton.` : '');

  return (
    <section className="section">
      <div className="container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <div className="breadcrumb">
          <Link href={`${base}/products`}>{det.back}</Link>
        </div>
        <div className="detail-head">
          <div className="detail-thumb">
            {p.image ? (
              <img src={p.image} alt={seo.name} />
            ) : (
              <span>{p.capacityMl ? `${p.capacityMl}ml` : p.style[lang]}</span>
            )}
          </div>
          <div className="detail-info">
            <h2 style={{ marginTop: 0 }}>{seo.name}</h2>
            <div className="sub" style={{ color: 'var(--ink-soft)', marginBottom: 14 }}>{p.name}</div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 16 }}>{geoDesc}</p>
            <table className="spec-table">
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td>{r[0]}</td>
                    <td>{r[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href={`${base}/contact?product=${encodeURIComponent(p.name)}`} className="btn btn-accent">
              {det.request} →
            </Link>
            <div className="note" style={{ marginTop: 16 }}>{det.note}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
