import Image from "next/image";
import wordpress from "@/public/wordpress.webp";
import webflow from "@/public/channels4_profile.webp";
import shopify from "@/public/shopify.webp";
import figma from "@/public/1578556490672.webp";
import code from "@/public/codecraft.webp";

const technologies = [
  { src: webflow, alt: "Webflow", name: "Webflow" },
  { src: wordpress, alt: "WordPress", name: "WordPress" },
  { src: shopify, alt: "Shopify", name: "Shopify" },
  { src: figma, alt: "Figma", name: "Figma" },
  { src: code, alt: "Codecrafters", name: "Codecrafters" },
];

const Tech = () => {
  return (
    <section id="tech" className="section bg-slate-50">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">Our toolkit</span>
            <h2 className="section-title mt-4">
              Built around the platforms you already use
            </h2>
            <p className="section-copy mt-4">
              We test and document real hosting, CMS, and commerce stacks so the
              advice you get matches the environment you actually run.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-indigo-200"
              >
                <Image
                  src={tech.src}
                  width={56}
                  height={56}
                  alt={tech.alt}
                  loading="lazy"
                  className="h-12 w-12 rounded-xl object-contain"
                />
                <span className="mt-3 text-sm font-medium text-slate-700">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tech;
