import * as path from "path"
import * as utils from "./utils.js"

process.chdir(path.join(import.meta.dirname, ".."));

[
  "build_js",
  "build_css",
  "build_doc",
].forEach(task => utils.npm_run(task));
