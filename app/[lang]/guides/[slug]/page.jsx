import Link from 'next/link';
import { dict } from '../../../../lib/i18n';
import { guides, getGuide } from '../../../../lib/guides';

export function generateStaticParams() {
  return guides.flatMap((g) => ['en', 'pl'].map((lang) => ({ slug: g.slug, lang })));
}

export function generateMetadata({ params }) {
  const g = getGuide(params.slug);
  if (!g) return { title: 'Guide not found' };
  const lang = params.lang === 'pl' ? 'pl' : 'en';
  const c = g[lang] || g.en;
  return {
    title: `${c.title} | SS Mugs`,
    description: c.description,
    alternates: { languages: { en: `/en/guides/${g.slug}`, pl: `/pl/guides/${g.slug}` } },
  };
}

export default function GuideDetail({ params }) {
  const g = getGuide(params.slug);
  if (!g) return <div className="container section">Guide not found.</div>;
  const lang = params.lang === 'pl' ? 'pl' : 'en';
  const c = g[lang] || g.en;
  const d = dict[lang] || dict.en;
  const gnav = d.guides;
  const base = `/${lang}`;

  // Article structured data (helps AI engines cite the page as a source)
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.description,
    dateModified: c.updated,
    author: { '@type': 'Organization', name: 'SS Mugs', url: 'https://ssmugs.com' },
    publisher: { '@type': 'Organization', name: 'SS Mugs', url: 'https://ssmugs.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://ssmugs.com/${lang}/guides/${g.slug}` },
  };

  // FAQ structured data (answers the exact buyer questions AI assistants surface)
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 860 }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

        <Link href={`${base}/guides`} style={{ color: 'var(--ink-soft)', fontSize: 14, textDecoration: 'none' }}>
          ← {gnav.back}
        </Link>

        <h1 style={{ marginTop: 16, fontSize: 32, letterSpacing: '-0.4px' }}>{c.title}</h1>
        <p className="lead">{c.description}</p>
        <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 8 }}>
          {gnav.updated}: {c.updated}
        </p>

        <div style={{ marginTop: 24 }}>
          {c.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 22, margin: '0 0 10px' }}>{s.h}</h2>
              {(s.paras || []).map((p, j) => (
                <p key={j} style={{ margin: '0 0 12px', lineHeight: 1.7, color: 'var(--ink)' }}>
                  {p}
                </p>
              ))}
              {s.list && (
                <ul style={{ margin: '4px 0 12px', paddingLeft: 20, lineHeight: 1.7 }}>
                  {s.list.map((li, k) => (
                    <li key={k} style={{ marginBottom: 6 }}>{li}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 36, borderTop: '1px solid var(--line)', paddingTop: 24 }}>
          <h2 style={{ fontSize: 22 }}>{gnav.faqTitle}</h2>
          {c.faq.map((it, i) => (
            <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
              <h3 style={{ marginTop: 0, fontSize: 16 }}>{it.q}</h3>
              <p style={{ margin: 0, color: 'var(--ink-soft)', lineHeight: 1.65 }}>{it.a}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 30 }}>
          <Link href={`${base}/contact`} className="btn btn-accent">{d.nav.contact} →</Link>
        </div>
      </div>
    </section>
  );
}
