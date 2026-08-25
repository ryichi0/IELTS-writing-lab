'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import NavLink from './NavLink'


export default function HamburgerMenu() {
  const nav_links = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Learn", link: "/learn" },
    { title: "My writings", link: "/writings" },
  ]
  const [displayMenu, setDisplayMenu] = useState(false)
  return (
    <>
      {displayMenu
        ?
        <div className="absolute inset-0 bg-background px-4">
          <span className="h-18 flex items-center cursor-pointer" onClick={() => setDisplayMenu(false)}>return</span>
          <ul className="flex flex-col items-start mt-12">
            {nav_links.map((item, index) => {
              return (
                <li className="w-full py-2" key={index}>
                  <NavLink link={item.link} title={item.title} />
                </li>
              )
            })}
          </ul>
          <div className="mt-6 border-t border-primary py-2">
            <Link href={"/profile"}>Profile</Link>
          </div>
        </div>
        :
        <span className="cursor-pointer" onClick={() => setDisplayMenu(true)}>menu</span>
      }
    </>
  )
}
