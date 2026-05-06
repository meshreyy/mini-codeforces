'use client'
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export function SubmissionsPanel({ problemId }) {
  const { data: session } = useSession()
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    if (!session) return
    fetch(`/api/submissions?problemId=${problemId}`)
      .then(res => res.json())
      .then(data => setSubmissions(data))
  }, [session, problemId])

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">My Submissions</h2>
      {submissions.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <table className="w-full border rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Result</th>
              <th className="px-4 py-2 text-left">Tests Passed</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Memory</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-2 text-gray-500">{s.id.slice(0, 8)}...</td>
                <td className="px-4 py-2">{s.result === "ac" ? "✅" : "❌"} {s.result.toUpperCase()}</td>
                <td className="px-4 py-2">{s.tests_passed ?? "-"}</td>
                <td className="px-4 py-2">{s.time ?? "-"}</td>
                <td className="px-4 py-2">{s.memory ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
