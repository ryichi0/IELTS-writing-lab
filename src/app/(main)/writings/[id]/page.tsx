import PrimaryLink from '@/components/ui/PrimaryLink';
import { formatDate } from '@/lib/format';
import { getSingleWriting } from '@/lib/writings';
import { ChevronRightIcon, ClipboardList, Trash } from 'lucide-react';
import { notFound } from 'next/navigation';
import TaskHeader from '../../topics/[topic_id]/_components/TaskHeader';
import Image from 'next/image';
import UpdateWritingMode from './_components/UpdateWritingMode';
import { deleteWriting } from './actions';



export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const writing = await getSingleWriting(id)
  if (!writing) notFound()
  const wasUpdated = writing.updatedAt.getTime() - writing.createdAt.getTime() > 1000;


  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-1 items-center">
        <PrimaryLink className="opacity-70" title={"Dashboard"} link={"/dashboard"} />
        <ChevronRightIcon className="text-primary/30 size-4" />
        <PrimaryLink className="opacity-70" title={"My Writings"} link={"/writings"} />
        <ChevronRightIcon className="text-primary/30 size-4" />
        <PrimaryLink className="font-black" title={writing.topic.title} link={"/"} />
      </div>


      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-4">
          <h1 className="text-h1">Writing Details</h1>

          <div className="flex gap-4 items-center">
            <p className="text-h4">{writing.topic.title}</p>
            <span className={`font-medium text-body py-1 px-3 rounded-md hover:shadow-card ${writing.status === "SUBMITTED" ? "text-success bg-success-bg" : "text-warning bg-warning-bg"}`} >{writing.status}</span>
          </div>
          <p className="text-foreground-muted font-light">
            <span>{formatDate(writing.createdAt)}</span>
            {wasUpdated && <span> · Last updated {formatDate(writing.updatedAt)}</span>}
          </p>
        </div>
      </div>


      <div className="flex flex-col md:flex-row gap-6 md:items-start">
        <div className="flex flex-col gap-4 md:gap-6 flex-1/5 bg-surface md:p-6 p-4 rounded-lg border border-border">
          <TaskHeader topic={writing.topic} />
          <div className="w-full border-t border-border "></div>
          <Image className="w-full md:hidden" src="/Frame.png" alt="ACADEMIC TASK 1" width={400} height={100} />
          <Image className="w-full hidden md:block" src="/simulated-chart.png" alt="ACADEMIC TASK 1" width={400} height={100} />
        </div>

        <div className="flex-2 flex flex-col gap-6">

          <UpdateWritingMode writing={writing} />

          <div className="bg-surface flex flex-col md:gap-6 gap-4 md:p-8 p-4 rounded-lg shadow-card border border-border">
            <p className="font-bold">Ai Evaluation</p>
            <div className="bg-gray-50 rounded-md p-6 flex flex-col gap-3 items-center justify-center border border-border">
              <ClipboardList />
              <span className="font-bold">Not yet evaluated</span>
              <p className="text-foreground-secondary text-body-sm text-center">Your writing has been submitted. AI feedback will appear here when it is available.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-border "></div>
      <form action={deleteWriting}>
        <button type="submit" className="text-error rounded-lg font-bold border border-border text-center cursor-pointer py-3 px-6 bg-surface flex gap-0.5 items-center">
          <Trash className="size-4 font-bold inline me-1" />
          <span>Delete Writing</span>
        </button>
      </form>
    </div>
  )
}
