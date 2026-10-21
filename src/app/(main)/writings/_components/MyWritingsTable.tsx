import PrimaryLink from '@/components/ui/PrimaryLink'
import Link from 'next/link'
import { formatDate } from '@/lib/format';
import { Writing } from './WritingsView';

export default function MyWritingsTable({ data }: { data: Writing[] }) {

  console.log(data);
  
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
              <td className="w-[8%] p-5 text-foreground-secondary text-body">{formatDate(item.createdAt)}</td>
              <td className="w-[60%] font-bold">{item.topic.title}</td>
              <td className="w-[8%] text-foreground-secondary text-body">{item.wordCount}</td>
              <td className="w-[8%]">
                <span className={`font-medium text-body py-1 px-3 rounded-md hover:shadow-card ${item.status === "SUBMITTED" ? "text-success bg-success-bg" : "text-warning bg-warning-bg"}`}>{item.status}</span>
              </td>
              <td className="w-[8%]">{item.score}</td>
              <td className="w-[8%]">
                <PrimaryLink className="" title="preview" link={`writings/${item.id}`} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
