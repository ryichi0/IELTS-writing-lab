import Image from 'next/image'
import React from 'react'
import TaskHeader from './_components/TaskHeader'
import SecondaryButton from '@/components/ui/SecondaryButton'
import PrimaryButton from '@/components/ui/PrimaryButton'

export default function page() {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:items-start">
      <div className="flex flex-col gap-4 md:gap-6 flex-1/5 bg-surface md:p-6 p-4 rounded-lg border border-border">
        <TaskHeader />
        <div className="w-full bg-border h-0.5"></div>
        <Image className="w-full md:hidden" src="/Frame.png" alt="ACADEMIC TASK 1" width={400} height={100} />
        <Image className="w-full hidden md:block" src="/simulated-chart.png" alt="ACADEMIC TASK 1" width={400} height={100} />
      </div>
      <div className="flex-2 bg-surface flex flex-col md:gap-6 gap-4 md:p-8 p-4 rounded-lg shadow-card border border-border">
        <div className="flex justify-between ">
          <div className="flex gap-2 items-center">
            <Image src="/clock.svg" alt="clock" width={14} height={14} />
            <span>12:45</span>
            <span className="text-foreground-muted text-caption font-light">ELAPSED TIME</span>
          </div>
          <span className="text-foreground-secondary">Goal: Min 150 words</span>
        </div>
        <form className="flex flex-col md:gap-6 gap-4 " action="">
          <textarea placeholder='The bar chart compares the percentage of water consumption across three main sectors—domestic, industrial, and agricultural—in four selected countries: the United States, Australia, the United Kingdom, and Japan.
Overall, it is evident that agriculture accounts for the largest proportion of water use in both the US and Australia, whereas the industrial sector consumes the absolute majority of water supplies in Japan and the UK.'
            className="w-full md:h-140 h-80 border border-primary rounded-lg p-3 md:p-6" name="" id="">
          </textarea>
          <div className="flex flex-col md:flex-row gap-2 items-stretch md:justify-between md:items-center">
            <p className="font-light text-foreground-muted "><span className="text-primary font-bold">72</span> / <span className="text-primary font-bold">150</span> words</p>
            <div className="flex md:flex-row flex-col gap-2">
              <SecondaryButton className={''} title={"Save Draft"} link={''} />
              <PrimaryButton className={''} title={"Submit and Review"} link={''} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
