import PrimaryButton from '@/components/ui/PrimaryButton'
import PrimaryLink from '@/components/ui/PrimaryLink'
import SecondaryButton from '@/components/ui/SecondaryButton'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function DashboardPage() {
  const DAILY_TOPICS = {
    title: "Water Consumption by Sector in Selected Countries",
    body: 'The bar chart illustrates the volume of water consumed by domestic, industrial, and agricultural sectors across four highly developed nations. Analyze the main trends and write your analysis under real exam parameters.',
    picture: "/chart-preview.jpg"
  }

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

  const LEARNING_HUB = [
    {
      title: "Master the Line Graph",
      caption: "Learn the structure of a high-scoring task 1 opening statement and general overview paragraph.",
      time: "Read Guide (8 min read) →"
    }
  ]
  return (
    <div className="flex md:flex-row flex-col gap-8">
      <div className="md:flex-3/5 flex flex-col gap-8">
        <section className="p-8 bg-surface rounded-xl flex flex-col gap-6 hover:shadow-card">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <span className="text-label bg-success-bg text-success-muted font-bold p-1 rounded-md">DAILY CHALLENGE</span>
              <span className="md:inline hidden text-label text-foreground-muted">
                Academic Task 1
              </span>
            </div>
            <span className="text-foreground-secondary text-body-lg--font-weight text-body-lg ">Recommended Time: 20m</span>
          </div>
          <div className="flex md:flex-row flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-display">{DAILY_TOPICS.title}</h2>
              <p className="text-body-sm text-body--font-weight text-foreground-secondary">{DAILY_TOPICS.body}</p>
            </div>
            <Image
              className="self-center"
              src={DAILY_TOPICS.picture}
              alt={DAILY_TOPICS.title.slice(0, 3)}
              height={140}
              width={500}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <PrimaryButton className="" title="Start writing" link="/" />
            <SecondaryButton className="md:inline hidden" title="View Writing Guide" link="/learn" />
          </div>

        </section>


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
                  <PrimaryLink className="hidden md:inline"  link="/" title={item.status === "Submitted" ? "View Report" : "Continue"}/>
                </div>
              </div>
            )
          })}
        </section>
      </div>


      <article className="md:flex-1/5">
        <div className="bg-surface p-6 flex flex-col gap-4 rounded-lg">
          <div>
            <span className="text-foreground-muted text-label">LEARNING HUB</span>
            <h4 className="text-h2">{LEARNING_HUB[0].title}</h4>
          </div>
          <p className="text-body-sm text-foreground-secondary">{LEARNING_HUB[0].caption}</p>
          <PrimaryLink className="" link="/learn" title={LEARNING_HUB[0].time}/>
        </div>
      </article>
    </div>
  )
}
