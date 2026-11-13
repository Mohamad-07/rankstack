import Link from "next/link";
import { ArrowRight, Clock3, Fingerprint, Globe, Search, Server } from "lucide-react";

const iconMap = {
  "ip checker": Globe,
  "ip lookup": Search,
  "dns propagation checker": Server,
  "dns checker": Server,
  "whois domain lookup": Fingerprint,
  "domain age checker": Clock3,
};

const ToolsCard = ({ title, description, url }) => {
  const Icon = iconMap[title.toLowerCase()] || Globe;

  return (
    <Link
      href={url}
      className="card card-hover group flex h-full flex-col p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      aria-label={title}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-950 group-hover:text-indigo-700">
        {title}
      </h3>
      <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-600">
        {description}
      </p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600">
        Open tool
        <ArrowRight
          className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
};

export default ToolsCard;
