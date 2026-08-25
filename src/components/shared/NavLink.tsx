import Link from 'next/link'
import React from 'react'

export default function NavLink({link, title} : {link:string, title:string}) {
  return (
    <Link className="hover:underline hover:text-primary text-foreground-secondary text-body-lg text-body-lg--font-weight" href={link}>{title}</Link>
  )
}
