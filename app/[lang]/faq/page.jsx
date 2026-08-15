import { dict } from '../../../lib/i18n';

export function generateMetadata({ params }) {
  const d = dict[params.lang] || dict.en;
  const f = d.faq;
  return {
    title: `${f.title} | SS Mugs`,
    description: f.subtitle,
    alternates: { languages: { en: '/en/faq', pl: '/pl/faq' } },
  };
}

export default function FaqPage({ params }) {
  const lang = params.lang;
  const d = dict[lang] || dict.en;
  const f = d.faq;
  const base = `/${lang}`;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: f.items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  return (
    <section className="section">
      <div className="container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <h2>{f.title}</h2>
        <p className="lead">{f.subtitle}</p>
        <div className="faq-list" style={{ maxWidth: 860, marginTop: 24 }}>
          {f.items.map((it, i) => (
            <div className="faq-item" key={i} style={{ padding: '18px 0', borderBottom: '1px solid var(--line)' }}>
              <h3 style={{ marginTop: 0, fontSize: 17 }}>{it.q}</h3>
              <p style={{ margin: 0, color: 'var(--ink-soft)', lineHeight: 1.65 }}>{it.a}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <a href={`${base}/contact`} className="btn btn-accent">{d.nav.contact} →</a>
        </div>
      </div>
    </section>
  );
}
