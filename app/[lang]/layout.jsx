import '../globals.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { LANGS, dict } from '../../lib/i18n';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const d = dict[params.lang] || dict.en;
  return {
    title: d.meta.title,
    description: d.meta.description,
    keywords:
      'stainless steel bottle, insulated bottle, vacuum flask, wholesale, China factory, B2B, OEM ODM, direct sale, drinkware supplier, custom logo',
    alternates: {
      languages: { en: `/en`, pl: `/pl` },
    },
  };
}

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SS Mugs',
  url: 'https://ssmugs.com',
  description:
    'China stainless steel insulated bottle factory. Wholesale B2B OEM/ODM manufacturer, direct sale, custom logo, low MOQ.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CN',
    telephone: '+86 579 86465870',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+86 150 8822 8843',
    contactType: 'sales',
    email: 'bob@ssmugs.com',
  },
};

export default function LangLayout({ children, params }) {
  const lang = params.lang;
  const d = dict[lang] || dict.en;
  return (
    <html lang={lang}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <Header lang={lang} nav={d.nav} />
        <main>{children}</main>
        <Footer lang={lang} d={d.footer} nav={d.nav} />
      </body>
    </html>
  );
}
