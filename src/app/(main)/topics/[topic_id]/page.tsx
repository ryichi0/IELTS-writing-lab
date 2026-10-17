import Image from 'next/image'
import TaskHeader from './_components/TaskHeader'
import { prisma } from '@/lib/prisma'
import WritingForm from './_components/WritingForm'

export default async function page({params}: {params: Promise<{ topic_id: string }>}) {
  const { topic_id } = await params;

  const topic = await prisma.topic.findUnique({
    where: {
      id: topic_id,
    },
  });


  if (!topic) {
    return <div>Topic not found</div>;
  }
  return (
    <div className="flex flex-col md:flex-row gap-6 md:items-start">
      <div className="flex flex-col gap-4 md:gap-6 flex-1/5 bg-surface md:p-6 p-4 rounded-lg border border-border">
        <TaskHeader topic={topic} />
        <div className="w-full bg-border h-0.5"></div>
        <Image className="w-full md:hidden" src="/Frame.png" alt="ACADEMIC TASK 1" width={400} height={100} />
        <Image className="w-full hidden md:block" src="/simulated-chart.png" alt="ACADEMIC TASK 1" width={400} height={100} />
      </div>
      <div className="flex-2 bg-surface flex flex-col md:gap-6 gap-4 md:p-8 p-4 rounded-lg shadow-card border border-border">
        <div className="flex justify-between ">
          {/* <div className="flex gap-2 items-center">
            <Image src="/clock.svg" alt="clock" width={14} height={14} />
            <span>12:45</span>
            <span className="text-foreground-muted text-caption font-light">ELAPSED TIME</span>
          </div> */}
          <span className="text-foreground-secondary">Goal: Min 150 words</span>
        </div>
        <WritingForm />
      </div>
    </div>
  )
}
