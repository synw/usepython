interface PyLog {
  id: string
  stdOut: Array<string>;
  stdErr: Array<string>;
  exception: string;
}

interface PyInstallLog {
  stage: number;
  msg: string;
}

export { PyLog, PyInstallLog }