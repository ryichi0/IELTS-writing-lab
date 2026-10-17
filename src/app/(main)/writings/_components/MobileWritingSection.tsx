import React from 'react'
import { WritingAttempt } from '../data'

export default function MobileWritingSection({data}: {data: WritingAttempt[]}) {
  return (
    <ul className="flex flex-col gap-3 md:hidden">
      {data.map((item, index) => {
        return (
          <li key={index} className="bg-surface flex flex-col gap-4 p-4 rounded-lg shadow-card">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-foreground-muted text-body">{item.date}</span>
                <span className={`font-bold text-body-sm px-3 rounded-md hover:shadow-card ${item.status === "submitted" ? "text-success bg-success-bg-strong" : "text-warning bg-warning-bg"}`}>
                  {item.status}
                </span>
              </div>
              <h3 className="font-bold leading-5 mt-2">{item.topic_title}</h3>
            </div>
            <div className="w-fill h-0.5 bg-border"></div>
            <div className="flex justify-between">
              <span className="text-foreground-secondary text-body-sm">{item.word_count}</span>
              <span className="text-primary font-bold">{item.score}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
