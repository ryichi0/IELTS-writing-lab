import DailyTopicCard from './_components/DailyTopicCard'
import RecentWritings from './_components/RecentWritings'
import LearningSection from './_components/LearningSection'
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {

  const topic = await prisma.topic.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });


  if (!topic) {
    return <div>No topic available.</div>;
  }

  return (
    <div className="flex md:flex-row flex-col gap-8">
      <div className="md:flex-3/5 flex flex-col gap-8">
        <DailyTopicCard topic={topic} />
        <RecentWritings />
      </div>

      <article className="md:flex-1/5">
        <LearningSection />
      </article>
    </div>
  )
}
