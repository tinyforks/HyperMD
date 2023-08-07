const path = require('path')
const express = require('express')
const buildCSS = require('./build-css')
const utils = require('./utils')

process.chdir(path.join(__dirname, ".."))

const url = 'http://127.0.0.1:8000'
const app = express()
app.use(express.static(process.cwd()))
app.listen(8000, () => console.log(`[HyperMD] ${url} is now ready`))
utils.open_url(url)

utils.npm_run("watch_js")
buildCSS.scan_and_compile("**/*.scss", true)
