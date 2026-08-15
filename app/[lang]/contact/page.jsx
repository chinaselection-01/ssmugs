import { dict } from '../../../lib/i18n';
import QuoteForm from '../../../components/QuoteForm';
import { Suspense } from 'react';

export default function ContactPage({ params }) {
  const d = dict[params.lang] || dict.en;
  const c = d.contact;
  return (
    <section className="section">
      <div className="container">
        <h2>{c.title}</h2>
        <p className="lead">{c.subtitle}</p>
        <Suspense fallback={null}>
          <QuoteForm lang={params.lang} labels={c} />
        </Suspense>
      </div>
    </section>
  );
}
