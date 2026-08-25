import Link from 'next/link'
import React from 'react'
import HamburgerMenu from './HamburgerMenu'

export default function MobileNavbar() {
  
  return (
    <nav className="flex md:hidden justify-between items-center bg-surface h-18 px-12">
      <div className="text-h3 text-primary">IELTS WRITING LAB</div>
      <HamburgerMenu />
    </nav>
  )
}
