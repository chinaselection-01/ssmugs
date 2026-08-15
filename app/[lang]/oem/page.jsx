import { dict } from '../../../lib/i18n';

export default function OemPage({ params }) {
  const d = dict[params.lang] || dict.en;
  const o = d.oem;
  return (
    <section className="section">
      <div className="container">
        <h2>{o.title}</h2>
        <p className="lead">{o.subtitle}</p>
        <p style={{ maxWidth: 760, marginBottom: 30 }}>{o.intro}</p>

        <div className="grid cols-3">
          {o.caps.map((c, i) => (
            <div className="card" key={i}>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: 48 }}>{o.processTitle}</h2>
        <div className="steps" style={{ marginTop: 22 }}>
          {o.steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="n">{s.n}</div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
