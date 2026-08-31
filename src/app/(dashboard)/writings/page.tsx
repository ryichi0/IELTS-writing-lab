'use client'
import React, { useState } from 'react'
import MyWritingsTable from './_components/MyWritingsTable'
import MobileWritingSection from './_components/MobileWritingSection'
import { MY_WRITINGS } from './data'
import PrimaryLink from '@/components/ui/PrimaryLink'


type FilterStatus = "all" | "draft" | "submitted";

export default function Writings() {

  const [keyword, setKeyword] = useState<FilterStatus>("all")
  const FILTER_BUTTONS = [
    { title: "all" },
    { title: "draft" },
    { title: "submitted" },
  ]

  const filtered_data = MY_WRITINGS.filter((item) => {
    if (keyword === "all") {
      return true;
    }

    return item.status === keyword;
  })

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <div className="hidden md:block">
          <h1 className="text-h1 md:text-display">My Writing Attempts</h1>
          <p className="text-foreground-secondary mt-1">Track your progress over time and monitor evaluation scores</p>
        </div>
        <div className="p-1 bg-border flex gap-1 rounded-lg">
          {FILTER_BUTTONS.map((item, index) => {
            return (
              <button onClick={() => setKeyword(item.title)} className={`${keyword === item.title && "bg-surface"} rounded-lg py-2 px-4 capitalize`} key={index}>{item.title}</button>
            )
          })}
        </div>
      </div>
      {filtered_data.length < 1
        ?
        <div className="flex justify-center items-center py-5 bg-surface rounded-lg hover:shadow-card">
          <p>No Writings?</p>
          <PrimaryLink className="ps-2" title={"Start one"} link={"/"} />
        </div>
        :
        <>
          <MyWritingsTable data={filtered_data} />
          <MobileWritingSection data={filtered_data} />
        </>
      }
    </div>
  )
}
