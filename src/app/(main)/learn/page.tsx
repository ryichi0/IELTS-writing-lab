'use client'
import React, { useState } from 'react'
import { LEARNING_HUBـCATEGORIES } from './data';
import PrimaryLink from '@/components/ui/PrimaryLink';

type FilterStatus = "all categories" | "line graphs" | "bar charts" | "process diagrams" | "maps" | "tables" | "general tips";
export default function Learn() {

  const [keyword, setKeyword] = useState<FilterStatus>("all categories")

  const FILTER_BUTTONS = [
    { title: "all categories" },
    { title: "line graphs" },
    { title: "bar charts" },
    { title: "process diagrams" },
    { title: "maps" },
    { title: "tables" },
    { title: "general tips" },
  ]

  const Filtered_list = LEARNING_HUBـCATEGORIES.filter((item) => {
    if (keyword === "all categories") {
      return true
    }
    return (item.title).toLowerCase() === keyword
  })
  return (
    <div className="flex flex-col gap-8 md:pb-16 pt-0">
      <div className="hidden md:block">
        <h1 className="text-h1 md:text-display">Academic Writing Task 1 Library</h1>
        <p className="text-foreground-secondary mt-1">Learn structured strategies, sentence frameworks, and vocabulary for each task variety.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTER_BUTTONS.map((item, index) => {
          return (
            <button onClick={() => setKeyword(item.title)} className={`${keyword === item.title ? "bg-primary text-surface" : "bg-surface border border-border text-foreground-secondary"} hover:shadow-card font-medium rounded-full py-2 px-4 capitalize cursor-pointer`} key={index}>{item.title}</button>
          )
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        {Filtered_list.map((item, index) => {
          return (
            <>
              {item.topics.map((topic, index) => {
                return (
                  <div className="bg-surface flex flex-col justify-between rounded-lg hover:shadow-card p-6 md:h-64 gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <span className="bg-success-bg text-success-muted rounded-md font-bold text-label p-1">{item.title}</span>
                        <span className="text-label text-foreground-muted font-light">{topic.readingTime} min reading</span>
                      </div>
                      <h3 className="text-h3">{topic.title}</h3>
                      <p className="text-body text-foreground-secondary leading-5 line-clamp-2">{topic.description}</p>
                    </div>
                    <PrimaryLink className="" title={"Start Lesson →"} link={""} />
                  </div>
                )
              })}
            </>

          )
        })}
      </div>
    </div>
  )
}
