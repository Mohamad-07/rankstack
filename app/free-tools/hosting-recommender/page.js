"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, RotateCcw, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import RelatedResources from "@/components/RelatedResources";
import QuizStep from "./components/QuizStep";
import ResultsCard from "./components/ResultsCard";
import AIExplanation from "./components/AIExplanation";
import questions from "./data/questions";
import hosts from "./data/hosts";
import { calculateRecommendations } from "./utils/scoring";

const faqs = [
  {
    question: "How accurate are the hosting recommendations?",
    answer:
      "Recommendations are based on the answers you provide and the feature, pricing, and performance data stored for each provider. Treat them as a shortlist for further research, not a guarantee of fit.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes. The hosting recommender is free, requires no account, and does not require you to enter personal information.",
  },
  {
    question: "How many hosting providers do you compare?",
    answer:
      "The dataset includes shared, VPS, cloud, and managed WordPress providers, and is updated as plans and pricing change.",
  },
  {
    question: "Can I use this for an online store?",
    answer:
      "Yes. Include your ecommerce and security requirements in the quiz and the scoring will favor providers that match those needs.",
  },
];

export default function AIHostingRecommenderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleNext = (value) => {
    const updatedAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(updatedAnswers);

    if (step + 1 < questions.length) {
      setThinking(true);
      setTimeout(() => {
        setStep(step + 1);
        setThinking(false);
      }, 700);
    } else {
      setThinking(true);
      setTimeout(() => {
        setResults(calculateRecommendations(updatedAnswers, hosts));
        setThinking(false);
        setShowExplanation(true);
      }, 900);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setResults([]);
    setThinking(false);
    setShowExplanation(false);
  };

  const aiAnalysis =
    "Based on your preferences for performance, affordability, and ease of setup, the scoring model evaluated each provider's strengths. The recommendations above are the closest matches to your project goals.";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Hosting Recommender",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    description:
      "Free hosting recommender by RankStack that helps you shortlist web hosting providers based on budget, traffic, and project goals.",
    url: "https://rankstack.dev/free-tools/hosting-recommender",
    creator: {
      "@type": "Organization",
      name: "RankStack",
      url: "https://rankstack.dev",
      logo: "https://rankstack.dev/rankstack-logo.png",
    },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Hosting recommendations based on project needs",
      "Personalized hosting comparison",
      "Free hosting quiz",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://rankstack.dev" },
              { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://rankstack.dev/free-tools" },
              { "@type": "ListItem", position: 3, name: "Hosting Recommender", item: "https://rankstack.dev/free-tools/hosting-recommender" },
            ],
          }),
        }}
      />

      <Header />

      <main>
        <PageHero
          eyebrow="Free tool"
          title="Find your ideal hosting plan"
          description="Answer a few questions about your project, budget, and technical needs. We'll shortlist the providers that fit best."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Free Tools", href: "/free-tools" },
            { label: "Hosting Recommender" },
          ]}
        />

        <section className="section bg-white">
          <div className="shell max-w-4xl">
            <div className="card p-5 sm:p-7 md:p-9">
              {!thinking && !results.length ? (
                <div className="mb-7">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>
                      Question {step + 1} of {questions.length}
                    </span>
                    <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-indigo-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>
              ) : null}

              <AnimatePresence mode="wait">
                {thinking ? (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-14 text-center"
                  >
                    <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-indigo-600"
                      />
                      <Bot className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                    </div>
                    <p className="mt-5 font-medium text-slate-900">
                      Matching your answers to hosting plans...
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Comparing features, pricing, and support
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {!thinking && !results.length ? (
                <QuizStep
                  step={step}
                  question={questions[step]}
                  total={questions.length}
                  onNext={handleNext}
                />
              ) : null}

              {!thinking && results.length > 0 ? (
                <div>
                  <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Sparkles className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                      Your hosting shortlist
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                      Based on your answers, these providers are the closest match.
                      Check current pricing and plan limits before buying.
                    </p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 grid gap-5 md:grid-cols-3"
                  >
                    {results.map((host, index) => (
                      <ResultsCard key={host.name} host={host} rank={index + 1} />
                    ))}
                  </motion.div>

                  {showExplanation ? (
                    <div className="mt-8">
                      <AIExplanation analysis={aiAnalysis} />
                    </div>
                  ) : null}

                  <div className="mt-8 border-t border-slate-200 pt-8 text-center">
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="btn-secondary"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      Take the quiz again
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section bg-slate-50">
          <div className="shell">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">How it works</span>
              <h2 className="section-title mt-4">A shortlist without the spreadsheet</h2>
              <p className="section-copy mt-4">
                The quiz narrows the field so you can spend less time comparing
                plans and more time evaluating the top matches.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Answer the questions",
                  copy: "Tell us about your site, traffic expectations, budget, and technical comfort level.",
                },
                {
                  step: "02",
                  title: "We score the options",
                  copy: "Your answers are compared against the features and tradeoffs of each provider.",
                },
                {
                  step: "03",
                  title: "Review your matches",
                  copy: "Compare the shortlisted providers, check current pricing, and choose with confidence.",
                },
              ].map((item) => (
                <div key={item.step} className="card p-6">
                  <span className="text-xs font-semibold tabular-nums text-indigo-600">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="shell max-w-3xl">
            <h2 className="section-title">Hosting recommender questions</h2>
            <div className="mt-6 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="card overflow-hidden">
                  <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-slate-900">
                    {faq.question}
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-slate-50">
          <div className="shell max-w-5xl">
            <RelatedResources context="/free-tools/hosting-recommender" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
