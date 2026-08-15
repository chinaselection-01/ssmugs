'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '../lib/products';

const TO = 'bob@ssmugs.com';

export default function QuoteForm({ lang, labels }) {
  const sp = useSearchParams();
  const initialProduct = sp.get('product') || '';
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', country: '', product: initialProduct, quantity: '', message: '',
  });
  const [err, setErr] = useState('');
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.company || !form.email) {
      setErr(labels.required);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErr('Email ' + labels.required);
      return;
    }
    setErr('');
    const subject = `Quote request — ${form.product || 'stainless steel bottles'} — ${form.company}`;
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Phone/WhatsApp: ${form.phone}`,
      `Country/Market: ${form.country}`,
      `Product: ${form.product}`,
      `Estimated quantity: ${form.quantity}`,
      `Message: ${form.message}`,
    ].join('\n');
    const mailto = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setDone(true);
  };

  if (done) {
    return (
      <div className="form">
        <div className="success">{labels.success}</div>
        <p style={{ color: 'var(--ink-soft)', fontSize: 14 }}>
          {labels.contactTitle || 'If your mail app did not open,'} <a href={`mailto:${TO}`}>email {TO}</a> directly.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      {err && <div className="err">{err}</div>}
      <div className="row">
        <div className="field">
          <label>{labels.name}</label>
          <input value={form.name} onChange={set('name')} />
        </div>
        <div className="field">
          <label>{labels.company}</label>
          <input value={form.company} onChange={set('company')} />
        </div>
      </div>
      <div className="row">
        <div className="field">
          <label>{labels.email}</label>
          <input type="email" value={form.email} onChange={set('email')} />
        </div>
        <div className="field">
          <label>{labels.phone}</label>
          <input value={form.phone} onChange={set('phone')} />
        </div>
      </div>
      <div className="row">
        <div className="field">
          <label>{labels.country}</label>
          <input value={form.country} onChange={set('country')} />
        </div>
        <div className="field">
          <label>{labels.product}</label>
          <select value={form.product} onChange={set('product')}>
            <option value="">{labels.pickProduct}</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.capacityMl ? `${p.capacityMl}ml ` : ''}
                {p.style[lang]} ({p.name})
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label>{labels.quantity}</label>
        <input value={form.quantity} onChange={set('quantity')} placeholder="e.g. 3000 pcs" />
      </div>
      <div className="field">
        <label>{labels.message}</label>
        <textarea rows={4} value={form.message} onChange={set('message')} />
      </div>
      <button type="submit" className="btn btn-accent" style={{ justifySelf: 'start' }}>
        {labels.submit}
      </button>
    </form>
  );
}
