import Link from 'next/link'
import React from 'react'

export default function PrimaryButton({title, link} : {title: string, link: string}) {
  return (
    <Link className="bg-primary text-surface py-3 px-6 rounded-lg font-bold hover:shadow-card" href={link}>{title}</Link>
  )
}
