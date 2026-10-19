"use client";
import { useState } from "react";
import MyWritingsTable from "./MyWritingsTable";
import MobileWritingSection from "./MobileWritingSection";
import PrimaryLink from "@/components/ui/PrimaryLink";

export type Writing = Awaited<ReturnType<typeof import("@/lib/writings").getUserWritings>>[number];

const FILTERS = ["all", "draft", "submitted"] as const;
type Filter = (typeof FILTERS)[number];

export default function WritingsView({ writings }: { writings: Writing[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = writings.filter(
    (w) => filter === "all" || w.status.toLowerCase() === filter
  );

  console.log(filtered);
   filtered
  return (
    <div>
      <div className="mb-6 flex justify-between">
        <div className="hidden md:block">
          <h1 className="text-h1 md:text-display">My Writing Attempts</h1>
          <p className="text-foreground-secondary mt-1">
            Track your progress over time and monitor evaluation scores
          </p>
        </div>

        <div className="p-1 bg-border flex gap-1 rounded-lg">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${filter === f ? "bg-surface" : ""} rounded-lg py-2 px-4 capitalize`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex justify-center items-center py-5 bg-surface rounded-lg hover:shadow-card">
          <p>No writings yet.</p>
          <PrimaryLink className="ps-2" title="Start one" link="/dashboard" />
        </div>
      ) : (
        <>
          <MyWritingsTable data={filtered} />
          <MobileWritingSection data={filtered} />
        </>
      )}
    </div>
  );
}