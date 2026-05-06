'use client'
import { useState } from "react"
import { CodeEditor } from "./CodeEditor"

export function SubmitSection({ problemId, contestId = null }) {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;
int main() {
    // write your code here
    return 0;
}`)
  const [testResults, setTestResults] = useState([])
  const [verdict, setVerdict] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("submit")
  const [submissions, setSubmissions] = useState([])

  const handleSubmit = async () => {
    setLoading(true)
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, problemId, contestId })
    })
    const result = await res.json()
    setTestResults(result.testResults)
    setVerdict(result.verdict)
    setLoading(false)
  }

  const loadSubmissions = async () => {
    const res = await fetch(`/api/submissions?problemId=${problemId}`)
    const data = await res.json()
    setSubmissions(data)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === "submissions") loadSubmissions()
  }

  return (
    <div className="pt-1">
      <div className="flex border-b mb-5">
        <button
          onClick={() => handleTabChange("submit")}
          className={`px-6 py-2 font-medium ${activeTab === "submit" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
        >
          Submit
        </button>
        <button
          onClick={() => handleTabChange("submissions")}
          className={`px-6 py-2 font-medium ${activeTab === "submissions" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
        >
          Submissions
        </button>
      </div>

      {activeTab === "submit" && (
        <div className="space-y-4">
          <CodeEditor code={code} onChange={setCode} />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Judging..." : "Submit"}
          </button>

          {verdict && (
            <div className="pt-2">
              <p className={`text-lg font-bold mb-3 ${verdict === "AC" ? "text-green-600" : "text-red-600"}`}>
                Verdict: {verdict}
              </p>
              <div className="flex flex-wrap gap-3">
                {testResults.map((t) => (
                  <div key={t.id} className={`px-4 py-2 rounded border text-sm font-medium ${t.passed ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"}`}>
                    {t.passed ? "✅" : "❌"} Test Case {t.id}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "submissions" && (
        <div className="pt-1">
          {submissions.length === 0 ? (
            <p className="text-gray-500">No submissions yet.</p>
          ) : (
            <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
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
            </div>
          )}
        </div>
      )}
    </div>
  )
}
