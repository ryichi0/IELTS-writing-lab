'use client'
import Image from 'next/image'
import React, { useState } from 'react'

export default function TaskHeader() {
  const [dropdown, setDropdown] = useState(false)
  return (
    <div className={`${dropdown ? "max-h-9 md:max-h-10" : "max-h-50 md:mx-h-50"} overflow-hidden flex flex-col gap-2 md:gap-5 transition-all`}>
      <div className="flex justify-between items-center">
        <span className='text-primary font-bold'>ACADEMIC TASK 1 PROMPT</span>
        <span className="cursor-pointer" onClick={() => setDropdown((prev) => !prev)}>
          <Image src={"/chevron-up.png"} alt="chevron-up" height={20} width={20} />
        </span>
      </div>
      <p className={`text-foreground font-bold text-body-sm`}>You should spend about 20 minutes on this task. The chart below shows the water consumption by sector in selected countries. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.</p>
    </div>
  )
}
