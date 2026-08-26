import Link from 'next/link'
import React from 'react'

export default function SecondaryButton({title, link, className} : {title: string, link: string, className: string}) {
  return (
    <Link className={`${className} text-foreground-secondary py-3 px-6 rounded-lg font-bold border border-border hover:shadow-card`} href={link}>{title}</Link>
  )
}
