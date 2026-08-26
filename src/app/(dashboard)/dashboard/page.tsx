import PrimaryButton from '@/components/ui/PrimaryButton'
import SecondaryButton from '@/components/ui/SecondaryButton'
import Image from 'next/image'
import React from 'react'

export default function DashboardPage() {
  const DAILY_TOPICS = {
    title: "Water Consumption by Sector in Selected Countries",
    body: 'The bar chart illustrates the volume of water consumed by domestic, industrial, and agricultural sectors across four highly developed nations. Analyze the main trends and write your analysis under real exam parameters.',
    picture: "/chart-preview.jpg"
  }
  return (
    <div className="flex md:flex-row flex-col gap-8">
      <div className="md:flex-3">
        <section className="p-8 bg-surface rounded-xl flex flex-col gap-6 hover:shadow-card">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <span className="text-label bg-success-bg text-success-muted font-bold p-1 rounded-md">DAILY CHALLENGE</span>
              <span className="text-label text-foreground-muted">
                Academic Task 1
              </span>
            </div>
            <span className="text-foreground-secondary text-body-lg--font-weight text-body-lg ">Recommended Time: 20m</span>
          </div>
          <div className="flex gap-6">
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
          <div className="flex gap-4">
            <PrimaryButton title="Start writing" link="/" />
            <SecondaryButton title="View Writing Guide" link="/" />
          </div>

        </section>
        <section>
          recent writings
        </section>
      </div>
      <article className="md:flex-1">
        <div>
          strike
        </div>
        <div>
          learn
        </div>
      </article>
    </div>
  )
}
