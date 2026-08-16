import Link from 'next/link';

export default function Footer({ lang, d, nav }) {
  const base = `/${lang}`;
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="cols">
          <div>
            <div className="brand-f">SS<span style={{ color: '#e0954a' }}>Mugs</span></div>
            <p style={{ maxWidth: 320, fontSize: 14 }}>{d.tag}</p>
          </div>
          <div>
            <h4>{d.nav}</h4>
            <Link href={base}>{nav.home}</Link>
            <Link href={`${base}/products`}>{nav.products}</Link>
            <Link href={`${base}/oem`}>{nav.oem}</Link>
            <Link href={`${base}/about`}>{nav.about}</Link>
            <Link href={`${base}/guides`}>{nav.guides}</Link>
            <Link href={`${base}/contact`}>{nav.contact}</Link>
          </div>
          <div>
            <h4>{d.contactTitle}</h4>
            <a href={`${base}/contact`}>{nav.contact}</a>
            <span style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>Email: bob@ssmugs.com</span>
            <span style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>Tel: +86 579 86465870</span>
            <span style={{ display: 'block', fontSize: 14 }}>Mobile/WhatsApp: +86 150 8822 8843</span>
          </div>
        </div>
        <div className="copy">© {year} ssmugs.com — {d.rights}</div>
      </div>
    </footer>
  );
}
