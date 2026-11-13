import Image from "next/image";
import { Quote, Star } from "lucide-react";

const TestimonialCard = ({ elm }) => {
  return (
    <div className="keen-slider__slide">
      <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex items-center justify-between">
          <Quote className="h-8 w-8 text-indigo-200" aria-hidden="true" />
          <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="h-4 w-4 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        <blockquote className="mt-5 flex-1 text-base leading-relaxed text-slate-700 sm:text-lg">
          “{elm.text}”
        </blockquote>

        <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
          <Image
            src={elm.img}
            alt={elm.name}
            width={48}
            height={48}
            loading="lazy"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <div className="text-sm font-semibold text-slate-950">{elm.name}</div>
            <div className="text-xs text-slate-500">{elm.title}</div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default TestimonialCard;
