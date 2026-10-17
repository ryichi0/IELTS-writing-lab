import MobileNavbar from '@/components/shared/mobile-nav'
import Navbar from '@/components/shared/navbar'
import { getCurrentUser } from '@/lib/auth';
import React, { ReactNode } from 'react'

export default async function layout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  return (
    <div className="flex flex-col w-full gap-8 md:gap-24">
      <div className="w-full " >
        <Navbar user ={user}/>
        <MobileNavbar user={user} />
      </div>
      <div className="px-4 md:px-2 md:w-300 md:mx-auto mb-10">
        {children}
      </div>
    </div>
  )
}
