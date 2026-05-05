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

  const handleSubmit = async () => {
    // we'll implement this soon
    console.log("Submitting:", code)
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Submit Solution</h2>
      <CodeEditor code={code} onChange={setCode} />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  )
}
