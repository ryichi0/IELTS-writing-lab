import Link from 'next/link'
import React from 'react'

export default function PrimaryButton({title, link, className} : {title: string, link: string, className:string}) {
  return (
    <Link className={`${className} bg-primary text-surface py-3 px-6 rounded-lg font-bold hover:shadow-card text-center`} href={link}>{title}</Link>
  )
}
