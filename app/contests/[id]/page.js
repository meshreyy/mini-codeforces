import { getContestById, getContestProblems } from "@/app/db/contests"
import Link from "next/link"

export default async function ContestPage({ params }) {
  const { id } = await params
  const [contest, problems] = await Promise.all([
    getContestById(id),
    getContestProblems(id)
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{contest.name}</h1>
      <p className="text-gray-500 mb-2">Division: {contest.division}</p>
      <p className="text-gray-500 mb-6">Status: {contest.status}</p>

      <h2 className="text-2xl font-bold mb-4">Problems</h2>
      <div className="border rounded-lg overflow-hidden">
        {problems.map((cp, index) => (
          <div key={cp.id} className="flex items-center justify-between px-6 py-4 border-b hover:bg-gray-50">
            <span className="font-medium">{String.fromCharCode(65 + index)}. {cp.problems.name}</span>
            <span className="text-gray-500">{cp.problems.difficulty_level}</span>
            <span className="text-blue-600">{cp.points} pts</span>
            <Link href={`/problems/${cp.problems.id}`} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
              Solve
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
