import { MapStore, ReadableAtom } from "nanostores";

/**
 * Represents a log entry for a Python execution.
 * @interface
 */
interface PyLog {
  /**
   * Unique identifier for the log entry.
   * @type {string}
   */
  id: string;

  /**
   * Array of standard output messages.
   * @type {Array<string>}
   */
  stdOut: Array<string>;

  /**
   * Array of standard error messages.
   * @type {Array<string>}
   */
  stdErr: Array<string>;

  /**
   * Exception message, if any occurred during the execution.
   * @type {string}
   */
  exception: string;
}

/**
 * Represents a log entry for the installation process of Python packages.
 * @interface
 */
interface PyInstallLog {
  /**
   * The current stage of the installation process.
   * @type {number}
   */
  stage: number;

  /**
   * Message related to the current stage of the installation process.
   * @type {string}
   */
  msg: string;
}

/**
 * Interface for a Python runner object.
 * @interface
 */
interface PyRunner {
  /**
   * Method to load Python packages.
   * @param {Array<string>} [pyoPackages] - Optional array of Python packages to load.
   * @param {Array<string>} [packages] - Optional array of additional packages to load.
   * @param {string} [initCode] - Optional initialization code to run.
   * @param {string} [transformCode] - Optional transformation code to run.
   * @returns {Promise<{ results: any, error: any }>} A promise that resolves with the results or rejects with an error.
   */
  load: PyLoadMethod;

  /**
   * Method to run a Python script synchronously.
   * @param {string} script - The Python script to run.
   * @param {string} [namespace] - Optional namespace for the script.
   * @param {string} [id] - Optional identifier for the script execution.
   * @param {Record<string, any>} [context] - Optional context for the script execution.
   * @returns {Promise<{ results: any, error: any }>} A promise that resolves with the results or rejects with an error.
   */
  run: PyRunMethod;

  /**
   * Method to run a Python script asynchronously.
   * @param {string} script - The Python script to run.
   * @param {string} [namespace] - Optional namespace for the script.
   * @param {string} [id] - Optional identifier for the script execution.
   * @param {Record<string, any>} [context] - Optional context for the script execution.
   * @returns {Promise<{ results: any, error: any }>} A promise that resolves with the results or rejects with an error.
   */
  runAsync: PyRunAsyncMethod;

  /**
   * Method to clear a namespace.
   * @param {string} namespace - The namespace to clear.
   * @returns {Promise<{ results: any, error: any }>} A promise that resolves with the results or rejects with an error.
   */
  clear: PyClearMethod;

  /**
   * Store for installation logs.
   * @type {MapStore<PyInstallLog>}
   */
  installLog: MapStore<PyInstallLog>;

  /**
   * Store for execution logs.
   * @type {MapStore<PyLog>}
   */
  log: MapStore<PyLog>;

  /**
   * Atom representing whether the runner is currently executing a script.
   * @type {ReadableAtom<boolean>}
   */
  isExecuting: ReadableAtom<boolean>;

  /**
   * Atom representing whether the runner is ready to execute scripts.
   * @type {ReadableAtom<boolean>}
   */
  isReady: ReadableAtom<boolean>;
}

/**
 * Type for the `load` method of the PyRunner interface.
 * @typedef {function} PyLoadMethod
 * @param {Array<string>} [pyoPackages] - Optional array of Python packages to load.
 * @param {Array<string>} [packages] - Optional array of additional packages to load.
 * @param {string} [initCode] - Optional initialization code to run.
 * @param {string} [transformCode] - Optional transformation code to run.
 * @returns {Promise<{ results: any, error: any }>} A promise that resolves with the results or rejects with an error.
 */
type PyLoadMethod = (
  pyoPackages?: Array<string>,
  packages?: Array<string>,
  initCode?: string,
  transformCode?: string
) => Promise<{ results: any, error: any }>;

/**
 * Type for the `run` method of the PyRunner interface.
 * @typedef {function} PyRunMethod
 * @param {string} script - The Python script to run.
 * @param {string} [namespace] - Optional namespace for the script.
 * @param {string} [id] - Optional identifier for the script execution.
 * @param {Record<string, any>} [context] - Optional context for the script execution.
 * @returns {Promise<{ results: any, error: any }>} A promise that resolves with the results or rejects with an error.
 */
type PyRunMethod = (
  script: string,
  namespace?: string,
  id?: string,
  context?: Record<string, any>
) => Promise<{ results: any, error: any }>;

/**
 * Type for the `runAsync` method of the PyRunner interface.
 * @typedef {function} PyRunAsyncMethod
 * @param {string} script - The Python script to run.
 * @param {string} [namespace] - Optional namespace for the script.
 * @param {string} [id] - Optional identifier for the script execution.
 * @param {Record<string, any>} [context] - Optional context for the script execution.
 * @returns {Promise<{ results: any, error: any }>} A promise that resolves with the results or rejects with an error.
 */
type PyRunAsyncMethod = (
  script: string,
  namespace?: string,
  id?: string,
  context?: Record<string, any>
) => Promise<{ results: any, error: any }>;

/**
 * Type for the `clear` method of the PyRunner interface.
 * @typedef {function} PyClearMethod
 * @param {string} namespace - The namespace to clear.
 * @returns {Promise<{ results: any, error: any }>} A promise that resolves with the results or rejects with an error.
 */
type PyClearMethod = (namespace: string) => Promise<{ results: any, error: any }>;

/**
 * Export the PyRunner interface and related types.
 * @type {PyRunner}
 */
export {
  PyRunner,
  PyLog,
  PyInstallLog,
  PyRunMethod,
  PyRunAsyncMethod,
  PyClearMethod,
  PyLoadMethod,
};
