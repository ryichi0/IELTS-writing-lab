import React, { ReactNode } from 'react'

export default function layout({children} : {children: ReactNode}) {
  return (
    <div className="md:w-300 md:mx-auto md:px-0 md:my-10 my-5 px-4 md:pt-18">
      {children}
    </div>
  )
}
