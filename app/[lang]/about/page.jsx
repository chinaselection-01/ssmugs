import { dict } from '../../../lib/i18n';

export default function AboutPage({ params }) {
  const d = dict[params.lang] || dict.en;
  const a = d.about;
  return (
    <section className="section">
      <div className="container">
        <h2>{a.title}</h2>
        <p className="lead">{a.subtitle}</p>
        <div style={{ maxWidth: 760 }}>
          {a.body.map((p, i) => (
            <p key={i} style={{ fontSize: 16 }}>{p}</p>
          ))}
        </div>
        <div className="grid cols-4" style={{ marginTop: 30 }}>
          {a.certs.map((c, i) => (
            <div className="card" key={i} style={{ textAlign: 'center' }}>
              <strong>{c}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
