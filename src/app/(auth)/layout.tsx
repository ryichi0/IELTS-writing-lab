import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center md:min-h-screen min-h-dvh -mt-10">
      <div className="md:bg-surface bg-transparent md:p-12 p-5 flex flex-col gap-8 rounded-lg md:shadow-card md:w-140 w-full">
        {children}
      </div>
    </div>
  )
}
