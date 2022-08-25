import worker from 'web-worker:./webworker.js';
import { pyLog, pyExecState, pyInstallLog, isPyExecuting, isPyReadyState, isPyReady } from "./store";

/** The main composable */
const usePython = () => {
  const _pyodideWorker = new worker();
  let _callback: (value: {
    results: any;
    error: any;
  } | PromiseLike<{
    results: any;
    error: any;
  }>) => void = (v) => null;

  function _dispatchEvent(id: string, data: Record<string, any>) {
    switch (data.type) {
      case "end":
        _callback({ results: data.res, error: null })
        _callback = (v) => null
        pyExecState.set(0);
        break;
      case "err":
        _callback = (v) => null
        pyExecState.set(0);
        pyLog.setKey("exception", data.msg)
        break;
      case "installlog":
        pyInstallLog.setKey("stage", data.msg.stage);
        pyInstallLog.setKey("msg", data.msg.msg);
        break;
      case "stderr":
        //console.log("STDERR:", data.msg)
        pyLog.get().stdErr.push(data.msg);
        pyLog.notify();
        break;
      case "stdout":
        //console.log("STDOUT:", data.msg)
        pyLog.get().stdOut.push(data.msg);
        pyLog.notify();
        //pyLog.setKey("stdOut", [...pyLog.get().stdOut, data.msg])
        break;
      default:
        pyExecState.set(0);
        throw new Error(`Unknown event type ${data.type}`)
    }
  }

  _pyodideWorker.onmessage = (event) => {
    const { id, ...data } = event.data;
    //console.log("=> msg in:", id, ":", data);
    _dispatchEvent(id ?? "", data)
  };

  function _processTransformCode(code: string): string {
    if (code.startsWith('\n')) {
      code.replace('\n', '')
    }
    const li = code.split("\n");
    const buf = new Array<string>();
    li.forEach((el) => {
      buf.push('  ' + el)
    });
    return buf.join("\n")
  }

  async function load(pyoPackages: Array<string> = [], packages: Array<string> = [], initCode = "", transformCode = ""): Promise<{ results: any, error: any }> {
    let res: { results: any; error: any };
    try {
      res = await run("_pyinstaller", "", {
        pyoPackages: pyoPackages,
        packages: packages,
        initCode: initCode,
        transformCode: _processTransformCode(transformCode)
      });
    } catch (e) {
      throw new Error(
        // @ts-ignore
        `Error in pyodideWorker at ${e.filename}, Line: ${e.lineno}, ${e.message}`
      );
    }
    isPyReadyState.set(1);
    return res
  }

  async function run(id: string, script: string, context: Record<string, any> = {}): Promise<{ results: any, error: any }> {
    if (pyExecState.get() === 1) {
      throw new Error("Only one python script can run at the time")
    }
    pyExecState.set(1);
    // reset logger
    pyLog.set({
      id: id,
      stdOut: [],
      stdErr: [],
      exception: "",
    });
    // exec
    return new Promise((onSuccess) => {
      _callback = onSuccess;
      _pyodideWorker.postMessage({
        ...context,
        python: script,
        id: id,
      });
    });
  }

  return {
    load,
    run,
    installLog: pyInstallLog,
    log: pyLog,
    isExecuting: isPyExecuting,
    isReady: isPyReady,
  }
}

export { usePython }