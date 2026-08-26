import Link from 'next/link'
import React from 'react'

export default function PrimaryLink({title, link, className} : {title: string, link: string, className:string}) {
  return (
    <Link className={`text-body text-primary font-bold hover:underline ${className}`} href={link}>{title}</Link>
  )
}
