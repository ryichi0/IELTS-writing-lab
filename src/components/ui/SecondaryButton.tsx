import Link from 'next/link'
import React from 'react'

export default function SecondaryButton({title, link} : {title: string, link: string}) {
  return (
    <Link className="text-foreground-secondary py-3 px-6 rounded-lg font-bold border border-border hover:shadow-card" href={link}>{title}</Link>
  )
}
