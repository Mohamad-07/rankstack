"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    label: "Office",
    value: "Asian Business Center, First Floor, Bahria Town Phase 7, Rawalpindi",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@rankstack.dev",
    href: "mailto:hello@rankstack.dev",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+44 7360 506217",
    href: "tel:+447360506217",
  },
];

const ContactUs = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:hello@rankstack.dev?subject=${subject}&body=${body}`;
    setStatus("Opening your email app…");
  };

  return (
    <section className="section bg-slate-50" id="contact">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Contact</span>
          <h2 className="section-title mt-4">Let&apos;s talk about your next move</h2>
          <p className="section-copy mt-4">
            Questions about a tool, a hosting decision, or a technical SEO
            audit? Send us a note and we will get back to you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-4 lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
              <div className="relative h-64 w-full bg-slate-200 sm:h-80">
                <iframe
                  width="100%"
                  height="100%"
                  className="absolute inset-0"
                  frameBorder="0"
                  title="RankStack office location"
                  marginHeight="0"
                  marginWidth="0"
                  scrolling="no"
                  src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Asian%20Business%20Center,%20First%20Floor,%20Bahria%20Town%20Phase%207,%20Rawalpindi&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                  style={{ filter: "grayscale(0.3) contrast(1.05)" }}
                />
              </div>

              <div className="divide-y divide-slate-100 p-5">
                {contactDetails.map((item) => {
                  const Icon = item.icon;
                  const value = item.href ? (
                    <a href={item.href} className="link-inline break-words">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-slate-700">{item.value}</span>
                  );

                  return (
                    <div key={item.label} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {item.label}
                        </div>
                        <div className="mt-1 text-sm leading-relaxed">{value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="field-label">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="field-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="field"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="field-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us what you are working on…"
                  required
                  rows={6}
                  className="field resize-y"
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-relaxed text-slate-500">
                  This opens your email app so you can send the message directly.
                </p>
                <button type="submit" className="btn-primary shrink-0">
                  Send message
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {status && (
                <p className="mt-4 text-sm font-medium text-indigo-600" role="status">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
