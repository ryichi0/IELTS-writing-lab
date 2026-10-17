import PrimaryLink from '@/components/ui/PrimaryLink'
import Link from 'next/link'
import React from 'react'

export default function RecentWritings() {

  const RECENT_WRITINGS = [
    {
      topic: "Household waste recycling in the UK, 2015-2020",
      date: "Yesterday at 4:32 PM",
      words: "182 words",
      status: "Submitted"
    },
    {
      topic: "Global temperature shifts across major cities",
      date: "3 days ago",
      words: "124 words",
      status: "Draft",
    }
  ]


  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="text-h2">Recent Writings</h2>
        <Link className="text-primary font-bold" href="/writings">View all attempts →</Link>
      </div>
      {RECENT_WRITINGS.map((item, index) => {
        return (
          <div className="rounded-lg bg-surface border border-border p-5 flex items-center md:justify-between hover:shadow-card gap-2 md:gap-0">
            <div className="flex flex-col gap-2">
              <h3 className="text-h4 line-clamp-1 md:line-clamp-none">{item.topic}</h3>
              <div className="text-foreground-muted flex gap-3 items-center">
                <span>{item.date}</span>
                <span className="bg-foreground-muted w-1 h-1 rounded-full"></span>
                <span>{item.words}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link className={`font-medium text-body py-1 px-3 rounded-md hover:shadow-card ${item.status === "Submitted" ? "text-success bg-success-bg" : "text-warning bg-warning-bg"}`} href="/">{item.status}</Link>
              <PrimaryLink className="hidden md:inline" link="/" title={item.status === "Submitted" ? "View Report" : "Continue"} />
            </div>
          </div>
        )
      })}
    </section>
  )
}
