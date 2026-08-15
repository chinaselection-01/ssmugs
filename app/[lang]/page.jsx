import Link from 'next/link';
import { dict } from '../../lib/i18n';

export default function Home({ params }) {
  const d = dict[params.lang] || dict.en;
  const h = d.home;
  const base = `/${params.lang}`;
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="badge">{h.badge}</span>
          <h1>{h.title}</h1>
          <p>{h.subtitle}</p>
          <div className="cta">
            <Link href={`${base}/contact`} className="btn btn-accent">{h.ctaPrimary}</Link>
            <Link href={`${base}/products`} className="btn btn-ghost">{h.ctaSecondary}</Link>
          </div>
          <div className="stats">
            {h.stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="n">{s.n}</div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <p className="lead" style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>{h.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid cols-4">
            {h.features.map((f, i) => (
              <div className="card" key={i}>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <h2>{h.whyTitle}</h2>
          <ul className="why">
            {h.why.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
          <div style={{ marginTop: 28 }}>
            <Link href={`${base}/oem`} className="btn">{d.nav.oem} →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
