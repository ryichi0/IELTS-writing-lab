import PrimaryLink from '@/components/ui/PrimaryLink'
import React from 'react'

export default function LearningSection() {

  const LEARNING_HUB = [
    {
      title: "Master the Line Graph",
      caption: "Learn the structure of a high-scoring task 1 opening statement and general overview paragraph.",
      time: "Read Guide (8 min read) →"
    }
  ]


  return (
    <div className="bg-surface p-6 flex flex-col gap-4 rounded-lg">
      <div>
        <span className="text-foreground-muted text-label">LEARNING HUB</span>
        <h4 className="text-h2">{LEARNING_HUB[0].title}</h4>
      </div>
      <p className="text-body-sm text-foreground-secondary">{LEARNING_HUB[0].caption}</p>
      <PrimaryLink className="" link="/learn" title={LEARNING_HUB[0].time} />
    </div>
  )
}
