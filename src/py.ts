import worker from 'web-worker:./webworker.js';
import { pyLog, pyExecState, pyInstallLog, isPyExecuting, isPyReadyState, isPyReady } from "./store.js";
import { PyRunner } from './interfaces.js';

/** The main composable */
const usePython = (): PyRunner => {
  const _pyodideWorker = new worker();
  //const _pyodideWorker = new Worker(new URL('./webworker.js', import.meta.url), { type: 'classic' })
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
        _callback({ results: null, error: data.msg })
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
        //pyLog.notify();
        break;
      case "stdout":
        //console.log("STDOUT:", data.msg)
        pyLog.get().stdOut.push(data.msg);
        //pyLog.notify();
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

  /** Load the Python runtime 
   * @param pyoPackages the list of Pyodide packages to install
   * @param packages the list of Pip packages to install
   * @param initCode the code to run before runtime initialization
   * @param transformCode the code to run after every script
  */
  async function load(
    pyoPackages: Array<string> = [], packages: Array<string> = [], initCode = "", transformCode = ""
  ): Promise<{ results: any, error: any }> {
    let res: { results: any; error: any };
    try {
      res = await run("", undefined, "_pyinstaller", {
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

  async function _run(
    script: string,
    isAsync: boolean,
    namespace?: string,
    id?: string,
    context: Record<string, any> = {}
  ): Promise<{ results: any, error: any }> {
    if (pyExecState.get() === 1) {
      throw new Error("Only one python script can run at the time")
    }
    pyExecState.set(1);
    // reset logger
    const _id = id ?? (+ new Date()).toString();
    pyLog.set({
      id: _id,
      stdOut: [],
      stdErr: [],
      exception: "",
    });
    // exec
    return new Promise((onSuccess) => {
      _callback = onSuccess;
      _pyodideWorker.postMessage({
        id: _id,
        namespace: namespace,
        python: script,
        isAsync: isAsync,
        ...context,
      });
    });
  }

  /** Run a Python script
   * @param script the Python code to run
   * @param namespace the namemespace where the code will run
   * @param id the script id
   * @param context some context data to pass to the runtime
   */
  async function run(
    script: string,
    namespace?: string,
    id?: string,
    context: Record<string, any> = {}
  ): Promise<{ results: any, error: any }> {
    return await _run(script, false, namespace, id, context)
  }

  /** Run an async Python script
   * @param script the Python code to run
   * @param namespace the namemespace where the code will run
   * @param id the script id
   * @param context some context data to pass to the runtime
 */
  async function runAsync(
    script: string,
    namespace?: string,
    id?: string,
    context: Record<string, any> = {}
  ): Promise<{ results: any, error: any }> {
    return await _run(script, true, namespace, id, context)
  }

  /** Clear the python memory and logs for a namespace
   * @param namespace the namespace to cleanup
   */
  async function clear(namespace: string): Promise<{ results: any, error: any }> {
    return new Promise((onSuccess) => {
      const _cb: (value: {
        results: any;
        error: any;
      } | PromiseLike<{
        results: any;
        error: any;
      }>) => void = (v) => {
        pyLog.set({
          id: "_flushns",
          stdOut: [],
          stdErr: [],
          exception: "",
        });
        onSuccess(v)
      };
      _callback = _cb;
      _pyodideWorker.postMessage({
        id: "_flushns",
        namespace: namespace,
      });
    });
  }

  return {
    load,
    run,
    runAsync,
    clear,
    /** The install log store */
    installLog: pyInstallLog,
    /** The runtime log store */
    log: pyLog,
    /** The execution state atom */
    isExecuting: isPyExecuting,
    /** The ready state atom */
    isReady: isPyReady,
  }
}

export { usePython }