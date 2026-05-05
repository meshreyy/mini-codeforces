import { getUpcomingContests } from "../app/db/contests"
import { ContestCard } from "./ContestCard"

export async function Contests() {
  const upcomingContests = await getUpcomingContests()

  return (
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
  )
}
