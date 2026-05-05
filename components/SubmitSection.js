'use client'
import { useState } from "react"
import { CodeEditor } from "./CodeEditor"

export function SubmitSection({ problemId }) {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;
int main() {
    // write your code here
    return 0;
}`)
  const [testResults, setTestResults] = useState([])
  const [verdict, setVerdict] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, problemId })
    })
    const result = await res.json()
    setTestResults(result.testResults)
    setVerdict(result.verdict)
    setLoading(false)
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Submit Solution</h2>
      <CodeEditor code={code} onChange={setCode} />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Judging..." : "Submit"}
      </button>

      {verdict && (
        <div className="mt-4">
          <p className={`text-lg font-bold mb-3 ${verdict === "AC" ? "text-green-600" : "text-red-600"}`}>
            Verdict: {verdict}
          </p>
          <div className="flex gap-3">
            {testResults.map((t) => (
              <div key={t.id} className={`px-4 py-2 rounded border text-sm font-medium ${t.passed ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"}`}>
                {t.passed ? "✅" : "❌"} Test Case {t.id}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
