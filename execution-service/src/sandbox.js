const { exec } = require("child_process")

function run(executablePath, input, timeLimit) {
  return new Promise((resolve, reject) => {
    const process = exec(
      executablePath,
      { timeout: timeLimit * 1000 },
      (error, stdout, stderr) => {
        if (error) {
          if (error.killed) {
            reject({ type: "TLE", message: "Time limit exceeded" })
          } else {
            reject({ type: "RE", message: stderr })
          }
        } else {
          resolve(stdout.trim())
        }
      }
    )
    process.stdin.write(input)
    process.stdin.end()
  })
}

module.exports = { run }
