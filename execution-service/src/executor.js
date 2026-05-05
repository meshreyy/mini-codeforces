const { exec } = require("child_process")
const fs = require("fs")
const path = require("path")

function compile(code, tempDir) {
  return new Promise((resolve, reject) => {
    const codePath = path.join(tempDir, "solution.cpp")
    const outPath = path.join(tempDir, "solution")

    fs.writeFileSync(codePath, code)

    exec(`g++ -o ${outPath} ${codePath}`, (error, stdout, stderr) => {
      if (error) {
        reject({ type: "CE", message: stderr })
      } else {
        resolve(outPath)
      }
    })
  })
}

module.exports = { compile }
