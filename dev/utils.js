import * as fs from "fs"
import * as child_process from "child_process"

/**
 *
 * @param {string} srcFile
 * @param {(text:string)=>string} procFunc may return non-string to avoid writing
 * @param {string} dstFile if not set, same as srcFile
 */
function processTextFile(srcFile, procFunc, dstFile = null) {
  dstFile = dstFile || srcFile

  fs.readFile(srcFile, "utf-8", (err, data) => {
    if (err) {
      console.error(`[!] Failed to read ${srcFile}`)
      console.error(err)
    }

    data = procFunc(data)
    if (typeof (data) !== "string") return

    fs.writeFile(dstFile, data, (err) => {
      if (err) {
        console.error(`[!] Failed to write ${dstFile}`)
        console.error(err)
      }
    })
  })
}

function run_command(program, args, dir='.') {
  var cwd = process.cwd();

  if (dir !== '.') {
    process.chdir(dir)
  }

  let promise = new Promise((res, rej) => {
    var proc = child_process.spawn(program, args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('exit', (code) => {
      res([code, proc])
    });
  })

  if (dir !== '.') {
    process.chdir(cwd)
  }

  return promise
}

function npm_run(command, halt_on_err=true, next=undefined) {
  var platform_suffix = process.platform === "win32" ? ".cmd" : ""
  return run_command(`npm${platform_suffix}`, ["run", command], '.').then(([code, proc]) => {
    if (code) {
      console.error(`npm run ${command}: exit code ${code}`)
      if (halt_on_err) {
        process.exit(code)
      }
    }
  })
}

function open_url(url) {
  return import('open').then(({default: open}) => {
    async function opener() {
      await open(url)
    }

    opener()
  })
}

export {
  processTextFile,
  run_command,
  npm_run,
  open_url,
}
