import PrimaryButton from '@/components/ui/PrimaryButton'
import SecondaryButton from '@/components/ui/SecondaryButton'
import Image from 'next/image'
import React from 'react'

export default function DailyTopicCard() {

  const DAILY_TOPICS = {
    title: "Water Consumption by Sector in Selected Countries",
    body: 'The bar chart illustrates the volume of water consumed by domestic, industrial, and agricultural sectors across four highly developed nations. Analyze the main trends and write your analysis under real exam parameters.',
    picture: "/chart-preview.jpg"
  }

  
  return (
    <section className="md:p-8 p-5 bg-surface rounded-xl flex flex-col gap-6 hover:shadow-card">
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
  )
}
