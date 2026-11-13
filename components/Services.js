import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Gauge,
  Image as ImageIcon,
  Network,
  Search,
  ServerCog,
} from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Technical SEO audits",
    description:
      "Crawl-level analysis of indexing, structured data, internal links, and Core Web Vitals with a prioritized action plan.",
  },
  {
    icon: Gauge,
    title: "Performance optimization",
    description:
      "Diagnose slow pages, reduce payloads, and improve LCP, INP, and CLS with practical fixes you can ship.",
  },
  {
    icon: ServerCog,
    title: "Hosting optimization",
    description:
      "Compare hosting stacks, tune caching and DNS, and choose infrastructure that matches your traffic and budget.",
  },
  {
    icon: Network,
    title: "Network diagnostics",
    description:
      "Trace DNS, IP, and propagation issues with browser-based tools that give you answers in seconds.",
  },
  {
    icon: ImageIcon,
    title: "Image optimization",
    description:
      "Compress and convert assets without visible quality loss to cut page weight and improve search performance.",
  },
  {
    icon: BarChart3,
    title: "Programmable SEO",
    description:
      "Turn repeatable technical checks into workflows your team can run consistently across every site you manage.",
  },
];

const Services = () => {
  return (
    <section id="services" className="section bg-slate-50">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Why RankStack</span>
          <h2 className="section-title mt-4">
            Practical help for the technical side of growth
          </h2>
          <p className="section-copy mt-4">
            No fluff. No vanity metrics. Just clear diagnostics, honest research,
            and fixes that move the numbers that matter.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="card card-hover flex h-full flex-col p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-indigo-100 bg-white p-6 shadow-soft sm:flex-row sm:p-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-950">
              Need a hand with a specific problem?
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Tell us what you are working on and we will point you in the right direction.
            </p>
          </div>
          <Link href="/contact" className="btn-primary group shrink-0">
            Talk to us
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
