import { getProblems } from "../app/db/problems"
import Link from "next/link"

export async function Problems() {
  const problems = await getProblems()

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {problems.map((problem) => (
        <div key={problem.id} className="border rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
          <h3 className="text-lg font-bold mb-2">{problem.name}</h3>
          <p className="text-sm text-gray-500 mb-2">Difficulty: {problem.difficulty_level}</p>
          <p className="text-sm text-gray-500 mb-4">Time: {problem.time_limit}s | Memory: {problem.memory_limit}MB</p>
          <Link href={`/problems/${problem.id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Problem
          </Link>
        </div>
      ))}
    </div>
  )
}
