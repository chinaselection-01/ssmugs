import Link from 'next/link';
import LangSwitch from './LangSwitch';

export default function Header({ lang, nav }) {
  const base = `/${lang}`;
  return (
    <header className="site-header">
      <div className="container inner">
        <Link href={base} className="brand">SS<span>Mugs</span></Link>
        <nav className="nav">
          <Link href={base}>{nav.home}</Link>
          <Link href={`${base}/products`}>{nav.products}</Link>
          <Link href={`${base}/oem`}>{nav.oem}</Link>
          <Link href={`${base}/about`}>{nav.about}</Link>
          <Link href={`${base}/faq`}>{nav.faq}</Link>
          <Link href={`${base}/contact`} className="btn btn-accent" style={{ padding: '9px 18px' }}>{nav.contact}</Link>
          <LangSwitch lang={lang} label={nav.lang} />
        </nav>
      </div>
    </header>
  );
}
