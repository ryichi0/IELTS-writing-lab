import DailyTopicCard from './_components/DailyTopicCard'
import RecentWritings from './_components/RecentWritings'
import LearningSection from './_components/LearningSection'

export default function DashboardPage() {

  return (
    <div className="flex md:flex-row flex-col gap-8">
      <div className="md:flex-3/5 flex flex-col gap-8">
        <DailyTopicCard />
        <RecentWritings />
      </div>

      <article className="md:flex-1/5">
        <LearningSection />
      </article>
    </div>
  )
}
