import { getProblems } from "@/app/db/problems"
import Link from "next/link"

export default async function ProblemsPage() {
  const problems = await getProblems()

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-10">
      <h1 className="text-3xl font-bold mb-8">Problems</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((problem) => (
          <div key={problem.id} className="border rounded-lg p-5 md:p-6 shadow-sm bg-white">
            <h3 className="text-lg font-bold mb-2">{problem.name}</h3>
            <p className="text-sm text-gray-500 mb-2">Difficulty: {problem.difficulty_level}</p>
            <p className="text-sm text-gray-500 mb-5">Time: {problem.time_limit}s | Memory: {problem.memory_limit}MB</p>
            <Link href={`/problems/${problem.id}`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              View Problem
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
