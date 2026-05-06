import { getProblemById } from "@/app/db/problems"
import { getServerSession } from "next-auth"
import { supabase } from "@/lib/supabase"
import fs from "fs"
import path from "path"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

async function executeCode({ code, input, timeLimit }) {
  const executionServiceUrl = process.env.EXECUTION_SERVICE_URL

  if (executionServiceUrl) {
    const res = await fetch(`${executionServiceUrl.replace(/\/$/, "")}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, input, timeLimit })
    })

    if (!res.ok) {
      throw new Error(`Execution service error: ${res.status}`)
    }

    return await res.json()
  }

  // Fallback for production when a dedicated execution service URL is not configured.
  const res = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: "cpp",
      version: "10.2.0",
      files: [{ content: code }],
      stdin: input
    })
  })

  if (!res.ok) {
    throw new Error(`Piston API error: ${res.status}`)
  }

  const payload = await res.json()
  const compileStderr = payload?.compile?.stderr?.trim()
  const run = payload?.run ?? {}
  const runStdout = typeof run.stdout === "string" ? run.stdout : ""
  const runStderr = typeof run.stderr === "string" ? run.stderr : ""

  if (compileStderr) {
    return { verdict: "CE", stderr: compileStderr }
  }

  if (run.signal === "SIGKILL") {
    return { verdict: "TLE", stderr: "Time limit exceeded" }
  }

  if ((run.code ?? 0) !== 0) {
    return { verdict: "RE", stderr: runStderr || "Runtime error" }
  }

  return { verdict: "success", stdout: runStdout }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })

    const { code, problemId, contestId } = await req.json()
    const problem = await getProblemById(problemId)

    const inputsDir = path.join(process.cwd(), problem.testcase_folder, "inputs")
    const outputsDir = path.join(process.cwd(), problem.testcase_folder, "outputs")
    const inputFiles = fs.readdirSync(inputsDir).sort()

    let testsPassed = 0
    let finalVerdict = "AC"
    const testResults = []

    for (let i = 0; i < inputFiles.length; i++) {
      const file = inputFiles[i]
      const input = fs.readFileSync(path.join(inputsDir, file), "utf-8")
      const expected = fs.readFileSync(path.join(outputsDir, file), "utf-8").trim()

      const result = await executeCode({ code, input, timeLimit: problem.time_limit })
      let passed = false

      if (result.verdict === "success" && result.stdout.trim() === expected) {
        passed = true
        testsPassed++
      } else if (result.verdict !== "success") {
        finalVerdict = result.verdict
      } else {
        finalVerdict = "WA"
      }

      testResults.push({ id: i + 1, passed })
    }

    const { data: userData } = await supabase
      .from("users")
      .select("id")
      .eq("email", session.user.email)
      .single()

    const { error: insertError } = await supabase.from("submissions").insert([{
      user_id: userData.id,
      problem_id: problemId,
      contest_id: contestId || null,
      result: finalVerdict.toLowerCase(),
      tests_passed: testsPassed
    }])

    console.log("INSERT ERROR:", insertError)

    if (finalVerdict === "AC" && contestId) {
      const { data: existing } = await supabase
        .from("leaderboard")
        .select("*")
        .eq("contest_id", contestId)
        .eq("user_id", userData.id)
        .single()

      if (existing) {
        await supabase
          .from("leaderboard")
          .update({ score: existing.score + 100, last_solved_at: new Date().toISOString() })
          .eq("id", existing.id)
      } else {
        await supabase
          .from("leaderboard")
          .insert([{ contest_id: contestId, user_id: userData.id, score: 100, last_solved_at: new Date().toISOString() }])
      }
    }

    return Response.json({ verdict: finalVerdict, testsPassed, total: inputFiles.length, testResults })

  } catch (err) {
    console.error("SUBMIT ERROR:", err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
