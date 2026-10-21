'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import NavLink from './NavLink'
import { NavUser } from '@/types/auth'
import PrimaryButton from '../ui/PrimaryButton'
import LogoutButton from './LogoutButton'


export default function HamburgerMenu({ user }: { user: NavUser }) {

  const [displayMenu, setDisplayMenu] = useState(false)
  return (
    <>
      {displayMenu
        ?
        <div className="absolute inset-0 bg-background px-4 z-200 flex flex-col gap-8 py-8">
          <span className="flex items-center cursor-pointer" onClick={() => setDisplayMenu(false)}>return</span>
          <ul className="flex flex-col items-start">
            <li><NavLink link="/dashboard" title="Dashboard" /></li>
            <li><NavLink link="/learn" title="Learn" /></li>
            {user && <li><NavLink link="/writings" title="my Writings" /></li>}
          </ul>
          <div className="border-t border-t-primary pt-3">
            {user ?
              <div className="flex justify-between items-center">
                <Link href={"/profile"} className="flex gap-3 ">
                  <div className="bg-primary/30 size-10 rounded-full flex justify-center items-center">{user?.name[0]}</div>
                  <div className="flex flex-col items-start">
                    <p className="font-bold" >{user?.name}</p>
                    <span className="text-caption text-foreground-muted font-light">{user?.email}</span>
                  </div>
                </Link>
                <LogoutButton />
              </div>
              :
              <PrimaryButton className="" title={"login / signup"} link={"/login"} />
            }
          </div>
        </div>
        :
        <span className="cursor-pointer" onClick={() => setDisplayMenu(true)}>
          <img src="/menu.jpg" alt="" />
        </span>
      }
    </>
  )
}
