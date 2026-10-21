import NavLink from '@/components/shared/NavLink';
import PrimaryLink from '@/components/ui/PrimaryLink';
import { formatDate } from '@/lib/format';
import { getSingleWriting } from '@/lib/writings';
import { ChevronRightIcon, RecycleIcon, Trash, Trash2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import TaskHeader from '../../topics/[topic_id]/_components/TaskHeader';
import Image from 'next/image';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';



export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const writing = await getSingleWriting(id)
  if (!writing) notFound()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-1 items-center">
        <PrimaryLink className="opacity-70" title={"Dashboard"} link={"/dashboard"} />
        <ChevronRightIcon className="text-primary/30 size-4" />
        <PrimaryLink className="opacity-70" title={"My Writings"} link={"/writings"} />
        <ChevronRightIcon className="text-primary/30 size-4" />
        <PrimaryLink className="font-black" title={writing.topic.title} link={"/"} />
      </div>


      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-h1">Writing Details</h1>

          <div className="flex gap-4 items-center">
            <p className="text-h4">{writing.topic.title}</p>
            <span className={`font-medium text-body py-1 px-3 rounded-md hover:shadow-card ${writing.status === "SUBMITTED" ? "text-success bg-success-bg" : "text-warning bg-warning-bg"}`} >{writing.status}</span>
          </div>
          <p className="text-foreground-muted font-light">
            <span>{formatDate(writing.createdAt)}</span>
            <span>{!writing.updatedAt && `·  Last updated ${formatDate(writing.createdAt)}`}</span>
          </p>

        </div>
        <PrimaryButton className="hidden md:inline" title="Edit writing" link={''} />
      </div>


      <div className="flex flex-col md:flex-row gap-6 md:items-start">
        <div className="flex flex-col gap-4 md:gap-6 flex-1/5 bg-surface md:p-6 p-4 rounded-lg border border-border">
          <TaskHeader topic={writing.topic} />
          <div className="w-full border-t border-border "></div>
          <Image className="w-full md:hidden" src="/Frame.png" alt="ACADEMIC TASK 1" width={400} height={100} />
          <Image className="w-full hidden md:block" src="/simulated-chart.png" alt="ACADEMIC TASK 1" width={400} height={100} />
        </div>

        <div className="flex-2 flex flex-col gap-6">
          <div className="bg-surface flex flex-col md:gap-6 gap-4 md:p-8 p-4 rounded-lg shadow-card border border-border">
            <div className="flex justify-between">
              <p className="font-bold">Your Response</p>
              <span className="font-light text-foreground-secondary">{writing.wordCount} words</span>
            </div>
            <div className="w-full border-t border-border "></div>
            <p className="text-foreground text-body">{writing.content}</p>
          </div>
          <div className="bg-surface flex flex-col md:gap-6 gap-4 md:p-8 p-4 rounded-lg shadow-card border border-border">ai evaluation</div>
        </div>
      </div>

      <div className="w-full border-t border-border "></div>


      <div className="flex flex-col md:flex-row md:justify-between gap-4 items-stretch">
        <SecondaryButton className="" title="Back to My Writings" link={"/writings"} />
        <button className="text-error font-bold">
        <Trash className="size-5 font-bold inline me-1" />Delete Writing</button>
      </div>
    </div>
  )
}
