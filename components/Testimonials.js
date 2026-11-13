"use client";

import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/Data/ClientData";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: { perView: 1, spacing: 16 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <section className="section bg-white">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <MessageSquareQuote className="h-3.5 w-3.5" aria-hidden="true" />
            Client feedback
          </span>
          <h2 className="section-title mt-4">Hear from people we have helped</h2>
          <p className="section-copy mt-4">
            Real feedback from founders, marketers, and publishers who use
            RankStack research and tools.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div ref={sliderRef} className="keen-slider">
            {testimonials.map((elm) => (
              <TestimonialCard elm={elm} key={elm.name} />
            ))}
          </div>

          {loaded && instanceRef.current && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => instanceRef.current?.prev()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({
                  length: instanceRef.current.track.details.slides.length,
                }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => instanceRef.current?.moveToIdx(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-current={currentSlide === index ? "true" : undefined}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === index
                        ? "w-6 bg-indigo-600"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => instanceRef.current?.next()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
