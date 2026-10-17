import Link from 'next/link'
import React from 'react'
import HamburgerMenu from './HamburgerMenu'
import { NavUser } from '@/types/auth'

export default function MobileNavbar({user}: {user: NavUser}) {
  
  return (
    <nav className="flex md:hidden justify-between items-center bg-surface h-14 px-4">
      <div className="text-h3 text-primary">IELTS WRITING LAB</div>
      <HamburgerMenu user={user} />
    </nav>
  )
}
