import * as path from "path"
import * as fs from "fs"
import { globSync } from "glob"
import * as sass from "sass"

'use strict'

function scan_and_compile(pattern = "**/*.scss", watch = false) {
  globSync(pattern, {
    ignore: "node_modules/**/*"
  }).forEach(filename => {
    compile_sass(filename)

    if (watch) {
      // `watch` option is currently not supported by new SASS
      // https://github.com/sass/dart-sass/issues/264
      fs.watchFile(filename, () => { compile_sass(filename) })
    }
  })
}

function compile_sass(sourceFilename) {
  console.log("[SCSS] Compiling " + sourceFilename)
  var outputFilename = sourceFilename.replace(/\.s[ac]ss$/, ".css")
  var proc = sass.render({
    file: sourceFilename,
    outFile: outputFilename
  }, function (err, result) {
    if (err) console.log(err)
    else {
      fs.writeFile(outputFilename, result.css, function (err) {
        if (!err) {
          console.log("[SCSS] finished " + sourceFilename)
          // if (exports.onChanged) exports.onChanged(sourceFilename, outputFilename)
        }
      });
    }
  })
}

// if (require.main === module) {
//   process.chdir(path.join(import.meta.dirname, ".."))
//   const watch = process.argv.includes("-w")

//   scan_and_compile("**/*.scss", watch)
// }

export {
  compile_sass,
  scan_and_compile,
}
