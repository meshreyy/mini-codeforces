const express = require("express")
const fs = require("fs")
const os = require("os")
const path = require("path")
const { compile } = require("./executor")
const { run } = require("./sandbox")

const app = express()
app.use(express.json())

const cors = require("cors")
app.use(cors())


app.post("/execute", async (req, res) => {
  const { code, input, timeLimit = 2, memoryLimit = 256 } = req.body

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "solution-"))

  try {
    const executablePath = await compile(code, tempDir)
    const output = await run(executablePath, input, timeLimit)
    res.json({ verdict: "success", stdout: output })
  } catch (err) {
    res.json({ verdict: err.type, stderr: err.message })
  } finally {
    fs.rmSync(tempDir, { recursive: true })
  }
})

app.listen(5000, () => console.log("Execution service running on port 5000"))
