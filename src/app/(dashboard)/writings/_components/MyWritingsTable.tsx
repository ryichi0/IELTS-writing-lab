import PrimaryLink from '@/components/ui/PrimaryLink'
import Link from 'next/link'
import React from 'react'
import { WritingAttempt } from '../data'

export default function MyWritingsTable({ data }: { data: WritingAttempt[] }) {

  return (
    <table className="w-full md:table table-fixed hidden">
      <thead>
        <tr className="text-foreground-secondary text-body-sm font-medium">
          <td className="w-[14%] p-5">DATE</td>
          <td className="w-[44%]">TOPIC TITLE</td>
          <td className="w-[10%]">WORD COUNT</td>
          <td className="w-[12%]">STATUS</td>
          <td className="w-[10%]">SCORE</td>
          <td className="w-[10%]">ACTION</td>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index} className="bg-surface border border-border rounded-md last-of-type:rounded-full!">
              <td className="w-[8%] p-5 text-foreground-secondary text-body">{item.date}</td>
              <td className="w-[60%] font-bold">{item.topic_title}</td>
              <td className="w-[8%] text-foreground-secondary text-body">{item.word_count}</td>
              <td className="w-[8%]">
                <Link className={`font-medium text-body py-1 px-3 rounded-md hover:shadow-card ${item.status === "submitted" ? "text-success bg-success-bg" : "text-warning bg-warning-bg"}`} href="/">{item.status}</Link>
              </td>
              <td className="w-[8%]">{item.score}</td>
              <td className="w-[8%]">
                <PrimaryLink className="" title={item.action} link={"/"} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
