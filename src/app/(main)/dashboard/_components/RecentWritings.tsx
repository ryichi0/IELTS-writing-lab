import PrimaryLink from '@/components/ui/PrimaryLink'
import { formatDate } from '@/lib/format'
import { getUserWritings } from '@/lib/writings'
import Link from 'next/link'
import React from 'react'

export default async function RecentWritings() {

  const RECENT_WRITINGS = await getUserWritings(2)


  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="text-h2">Recent Writings</h2>
        <Link className="text-primary font-bold" href="/writings">View all attempts →</Link>
      </div>
      {RECENT_WRITINGS.map((item, index) => {
        return (
          <div key={index} className="rounded-lg bg-surface border border-border p-5 flex items-center md:justify-between hover:shadow-card gap-2 md:gap-0">
            <div className="flex flex-col gap-2">
              <h3 className="text-h4 line-clamp-1 md:line-clamp-none">{item.topic.title}</h3>
              <div className="text-foreground-muted flex gap-3 items-center">
                <span>{formatDate(item.createdAt)}</span>
                <span className="bg-foreground-muted w-1 h-1 rounded-full"></span>
                <span>{item.wordCount}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`font-medium text-body py-1 px-3 rounded-md hover:shadow-card ${item.status === "SUBMITTED" ? "text-success bg-success-bg" : "text-warning bg-warning-bg"}`} >{item.status}</span>
              <PrimaryLink className="hidden md:inline" link="/" title={item.status === "SUBMITTED" ? "View Report" : "Continue"} />
            </div>
          </div>
        )
      })}
    </section>
  )
}
