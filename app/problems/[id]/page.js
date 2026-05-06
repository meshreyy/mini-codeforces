import { getProblemById } from "@/app/db/problems"
import ReactMarkdown from "react-markdown"
import fs from "fs"
import path from "path"
import { SubmitSection } from "@/components/SubmitSection"

export default async function ProblemPage({ params, searchParams }) {
  const { id } = await params
  const { contestId } = await searchParams
  const problem = await getProblemById(id)

  const filePath = path.join(process.cwd(), problem.description)
  const content = fs.readFileSync(filePath, "utf-8")

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/2 overflow-y-auto p-8 border-r">
        <h1 className="text-3xl font-bold mb-4">{problem.name}</h1>
        <p className="text-gray-500 mb-2">Difficulty: {problem.difficulty_level}</p>
        <p className="text-gray-500 mb-6">Time: {problem.time_limit}s | Memory: {problem.memory_limit}MB</p>
        <div className="prose max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      <div className="w-1/2 overflow-y-auto p-8">
        <SubmitSection problemId={problem.id} contestId={contestId || null} />
      </div>
    </div>
  )
}
