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
      'stainless steel mugs factory, professional stainless steel mugs factory, insulated bottle, vacuum insulated bottle, double wall bottle, wholesale, bulk order, China factory, B2B, OEM ODM, direct sale, custom logo, competitive price, drinkware supplier, ssmugs',
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
    'Professional stainless steel mugs factory in China. Wholesale and bulk-order B2B OEM/ODM manufacturer of insulated, vacuum insulated, double-wall drinkware — direct sale, custom logo, competitive price, low MOQ.',
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
        {/* Google Analytics 4 - ssmugs.com */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WFMD6SKYZ"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-WFMD6SKYZ');`,
          }}
        />
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
