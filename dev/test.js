const path = require('path')
const express = require('express')

process.chdir(path.join(__dirname, ".."))

const app = express()
app.use(express.static(process.cwd()))
app.listen(8000, () => console.log('[HyperMD] http://127.0.0.1:8000/test is now ready'))
import('open').then(({default: open}) => {
  async function opener() {
    await open('http://127.0.0.1:8000/test')
  }

  opener()
})
