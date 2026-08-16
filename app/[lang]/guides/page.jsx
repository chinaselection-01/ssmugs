import Link from 'next/link';
import { dict } from '../../../lib/i18n';
import { guides } from '../../../lib/guides';

export function generateStaticParams() {
  return ['en', 'pl'].map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const d = dict[params.lang] || dict.en;
  const g = d.guides;
  return {
    title: `${g.title} | SS Mugs`,
    description: g.subtitle,
    alternates: { languages: { en: '/en/guides', pl: '/pl/guides' } },
  };
}

export default function GuidesPage({ params }) {
  const lang = params.lang;
  const d = dict[lang] || dict.en;
  const g = d.guides;
  const base = `/${lang}`;
  const items = guides.map((gd) => ({ slug: gd.slug, ...(gd[lang] || gd.en) }));

  return (
    <section className="section">
      <div className="container">
        <h2>{g.title}</h2>
        <p className="lead">{g.subtitle}</p>
        <div className="grid cols-2" style={{ marginTop: 24 }}>
          {items.map((it) => (
            <Link
              href={`${base}/guides/${it.slug}`}
              key={it.slug}
              className="card"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit', transition: 'transform .15s ease, box-shadow .15s ease' }}
            >
              <h3 style={{ marginTop: 0 }}>{it.title}</h3>
              <p style={{ margin: '0 0 14px' }}>{it.description}</p>
              <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 14 }}>
                {g.readMore} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
