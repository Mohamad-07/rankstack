"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin } from "lucide-react";

const socialIcons = {
  github: { icon: Github, label: "GitHub" },
  instagram: { icon: Instagram, label: "Instagram" },
  linkedin: { icon: Linkedin, label: "LinkedIn" },
};

const TeamCard = ({ member }) => {
  const socials = Object.entries(member.socialLinks || {}).filter(
    ([key]) => socialIcons[key]
  );

  return (
    <motion.article
      role="listitem"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="card flex h-full flex-col items-center p-6 text-center"
    >
      <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-slate-100">
        <Image
          src={member.imageUrl}
          alt={`Portrait of ${member.name}`}
          fill
          sizes="80px"
          className="object-cover"
          loading="lazy"
        />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-950">
        {member.name}
      </h3>
      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-indigo-600">
        {member.role}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
        {member.description}
      </p>

      {socials.length > 0 && (
        <div className="mt-5 flex items-center gap-2">
          {socials.map(([key, href]) => {
            const SocialIcon = socialIcons[key].icon;
            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on ${socialIcons[key].label}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-indigo-300 hover:text-indigo-600"
              >
                <SocialIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      )}
    </motion.article>
  );
};

export default TeamCard;
