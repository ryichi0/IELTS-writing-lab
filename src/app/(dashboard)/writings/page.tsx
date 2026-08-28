'use client'
import React from 'react'
import MyWritingsTable from './_components/MyWritingsTable'
import MobileWritingSection from './_components/MobileWritingSection'
import { MY_WRITINGS } from './data'

export default function Writings() {
  const ACTION_BUTTONS = [
    { title: "All" },
    { title: "Drafts" },
    { title: "Submitted" },
  ]

  const filtered_data = MY_WRITINGS.slice(1,5)
  console.log(filtered_data);
  
  
  return (
    <div>
      <div className="mb-6 flex justify-between">
        <div className="hidden md:block">
          <h1 className="text-h1 md:text-display">My Writing Attempts</h1>
          <p className="text-foreground-secondary">Track your progress over time and monitor evaluation scores</p>
        </div>
        <div className="p-1 bg-border flex gap-1 rounded-lg">
          {ACTION_BUTTONS.map((item, index) => {
            return (
              <button className="py-2 px-4" key={index}>{item.title}</button>
            )
          })}
        </div>
      </div>
      <MyWritingsTable data={filtered_data} />
      <MobileWritingSection data={filtered_data} />
    </div>
  )
}
