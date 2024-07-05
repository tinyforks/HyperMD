import * as path from "path"
import express from "express"
import * as buildCSS from "./build-css.js"
import * as utils from "./utils.js"

process.chdir(path.join(import.meta.dirname, ".."))

const url = 'http://127.0.0.1:8000'
const app = express()
app.use(express.static(process.cwd()))
app.listen(8000, () => console.log(`[HyperMD] ${url} is now ready`))
utils.open_url(url)

utils.npm_run("watch_js")
buildCSS.scan_and_compile("**/*.scss", true)
