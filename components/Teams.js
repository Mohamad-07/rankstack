"use client";

import { useState } from "react";
import { teamMembers } from "@/Data/TeamData";
import TeamCard from "./TeamCard";

const Teams = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleMembers = showAll ? teamMembers : teamMembers.slice(0, 4);

  return (
    <section className="section bg-white" id="team">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our team</span>
          <h2 className="section-title mt-4">Meet the people behind RankStack</h2>
          <p className="section-copy mt-4">
            A small team of developers, writers, and SEO specialists who test
            what we publish.
          </p>
        </div>

        <div
          role="list"
          aria-label="RankStack team members"
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {visibleMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>

        {teamMembers.length > 4 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="btn-secondary"
            >
              {showAll ? "Show less" : "See all team members"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Teams;
