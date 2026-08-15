'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { products, capacityBuckets } from '../lib/products';

export default function Catalog({ lang, labels }) {
  const [cap, setCap] = useState('all');
  const [series, setSeries] = useState('all');

  const seriesList = useMemo(() => {
    const seen = new Map();
    products.forEach((p) => {
      if (!seen.has(p.style.en)) seen.set(p.style.en, p.style);
    });
    return Array.from(seen.values());
  }, []);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (cap === 'all' || p.capacityBucket === cap) &&
          (series === 'all' || p.style.en === series)
      ),
    [cap, series]
  );

  return (
    <>
      <div className="filters">
        <div className="filter-group">
          <label>{labels.filterCapacity}</label>
          <div className="chips">
            <button className={`chip ${cap === 'all' ? 'active' : ''}`} onClick={() => setCap('all')}>
              {labels.all}
            </button>
            {capacityBuckets.map((b) => (
              <button key={b} className={`chip ${cap === b ? 'active' : ''}`} onClick={() => setCap(b)}>
                {b}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <label>{labels.filterSeries}</label>
          <div className="chips">
            <button className={`chip ${series === 'all' ? 'active' : ''}`} onClick={() => setSeries('all')}>
              {labels.all}
            </button>
            {seriesList.map((s) => (
              <button
                key={s.en}
                className={`chip ${series === s.en ? 'active' : ''}`}
                onClick={() => setSeries(s.en)}
              >
                {s[lang]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginBottom: 16 }}>
        {filtered.length} {labels.results}
      </p>

      <div className="product-grid">
        {filtered.map((p) => (
          <div className="product" key={p.slug}>
            <Link href={`/${lang}/products/${p.slug}`} style={{ color: 'inherit' }}>
              <div className="thumb">
                {p.image ? (
                  <img src={p.image} alt={p.seo[lang].name} title={p.seo[lang].name} loading="lazy" />
                ) : (
                  <span>{p.capacityMl ? `${p.capacityMl}ml` : p.style[lang]}</span>
                )}
              </div>
            </Link>
            <div className="body">
              <div className="name">{p.seo[lang].name}</div>
              <div className="sub">{p.name}</div>
              <div className="specs">
                <span className="spec">{labels.perCarton}: {p.pcsPerCarton != null ? p.pcsPerCarton : '—'}</span>
                <span className="spec">{labels.carton}: {p.meas}</span>
              </div>
              <div className="foot">
                <div className="price">
                  {p.unitPrice != null ? (
                    <>
                      {labels.unitPrice} ¥{p.unitPrice}
                    </>
                  ) : (
                    labels.onRequest
                  )}
                </div>
                <Link href={`/${lang}/products/${p.slug}`} className="more">
                  {labels.view} →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
