'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LangSwitch({ lang, label }) {
  const pathname = usePathname() || `/${lang}`;
  const segments = pathname.split('/');
  segments[1] = lang === 'en' ? 'pl' : 'en';
  const target = segments.join('/') || `/${segments[1]}`;
  return (
    <Link href={target} className="lang-switch" hrefLang={segments[1]}>
      {label}
    </Link>
  );
}
