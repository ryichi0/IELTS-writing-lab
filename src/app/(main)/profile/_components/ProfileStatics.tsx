import React from 'react'

export default function ProfileStatics({statics, title}: {statics: string, title: string}) {
  return (
    <div className="md:bg-[#F8FAFC] bg-surface border border-border rounded-lg flex flex-col items-start gap-1 p-3 md:p-5">
      <span className="text-h2">{statics}</span>
      <span className="text-body-sm text-foreground-secondary">{title}</span>
    </div>
  )
}
