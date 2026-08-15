import Link from 'next/link';
import { dict } from '../../../lib/i18n';
import Catalog from '../../../components/Catalog';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'pl' }];
}

export default function ProductsPage({ params }) {
  const lang = params.lang;
  const d = dict[lang] || dict.en;
  return (
    <section className="section">
      <div className="container">
        <h2>{d.products.title}</h2>
        <p className="lead">{d.products.subtitle}</p>
        <Catalog lang={lang} labels={d.products} />
      </div>
    </section>
  );
}
