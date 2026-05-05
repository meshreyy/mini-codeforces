import { getExistingContests, getUpcomingContests } from "@/app/db/contests"
import { ContestCard } from "../../components/ContestCard"

export default async function ContestsPage() {
  const [upcomingContests, pastContests] = await Promise.all([
    getUpcomingContests(),
    getExistingContests(),
  ])

  return (
    <div className="min-h-screen">
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Upcoming Contests</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingContests.map((contest) => (
              <ContestCard key={contest.id} title={contest.name} id={contest.id} startTime={contest.start_time} endTime={contest.end_time} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Past Contests</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastContests.map((contest) => (
              <ContestCard key={contest.id} title={contest.name} id={contest.id} startTime={contest.start_time} endTime={contest.end_time} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
