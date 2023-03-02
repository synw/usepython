importScripts("https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.js");

var isPyLoaded = false;
var namespaces = {};
//var self.globInit = {};

function stdout(msg) {
  self.postMessage({ type: "stdout", msg: msg, id: null })
}

function stderr(msg) {
  self.postMessage({ type: "stderr", msg: msg, id: null })
}

function installLog(id, stage, msg) {
  self.postMessage({
    type: "installlog", msg: {
      stage: stage,
      msg: msg
    }, id: id
  })
}

function err(id, msg) {
  self.postMessage({ type: "err", msg: msg, id: id })
}

function end(id, res) {
  self.postMessage({ type: "end", res: res ?? null, id: id })
}

async function loadPyodideAndPackages(id, pyoPackages, packages, initCode, transformCode) {
  installLog(id, 1, "Loading python runtime")
  self.pyodide = await loadPyodide({
    stdout: stdout,
    stderr: stderr,
  });
  pyoPackages.unshift("micropip");
  //installog(2, `Installing python packages ${packages.join(", ")}`);
  installLog(id, 2, `Creating python env`);
  await self.pyodide.loadPackage(pyoPackages);
  installLog(id, 3, `Installing python packages`);
  self.parray = packages
  await pyodide.runPythonAsync(`
  import micropip
  from js import parray
  await micropip.install(parray.to_py())
  `);
  installLog(id, 4, `Initializing environment`);
  self.parray = undefined;
  const src = `from pyodide.code import eval_code_async
from pyodide.ffi import to_js
async def pyeval(code, ns):
  result = await eval_code_async(code, ns)
  ${transformCode}
  return to_js(result)`
  //console.log("SRC EXEC", src)
  await pyodide.runPythonAsync(src);
  if (initCode.length > 0) {
    await pyodide.runPythonAsync(initCode);
  }
  installLog(id, 5, "The python env is loaded")
  isPyLoaded = true;
}

async function runScript(python, id, globs) {
  try {
    //console.log("GLOBS", globs);
    //console.log("Load imports")
    await self.pyodide.loadPackagesFromImports(python);
    //console.log("Run py async")
    //let results = await self.pyodide.runPythonAsync(python);
    let results = await pyodide.globals.get("pyeval")(python, globs)
    //console.log("End", results, _globals)
    end(id, results)
  } catch (error) {
    //console.log("PY RUN ERR", error)
    err(id, error.message)
  }
}

self.onmessage = async (event) => {
  const { id, namespace, python, ...context } = event.data;
  if (id == "_flushns") {
    console.log("restore glob", JSON.stringify(pyodide.globals.get("dict")(), null, "  "));
    namespaces[namespace] = pyodide.globals.get("dict")();
  }
  // run
  else if (id != "_pyinstaller") {
    // The worker copies the context in its own "memory" (an object mapping name to values)
    for (const key of Object.keys(context)) {
      self[key] = context[key];
    }
    if (!isPyLoaded) {
      throw new Error("Python is not loaded")
    }
    let _globs = pyodide.globals;
    // check namespace
    if (namespace) {
      if (namespace in namespaces) {
        _globs = namespaces[namespace]
      } else {
        _globs = pyodide.globals.get("dict")();
        namespaces[namespace] = _globs
      }
      //console.log("Running script in ns", namespace, _globs)
    } /*else {
      console.log("Running script in main ns", _globs)
    }*/
    await runScript(python, id, _globs)
  } else {
    await loadPyodideAndPackages(id, context.pyoPackages, context.packages, context.initCode, context.transformCode);
    end(id)
  }
};