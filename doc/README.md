Quiz documentation / [Exports](modules.md)

# Use Python

[![pub package](https://img.shields.io/npm/v/usepython)](https://www.npmjs.com/package/usepython)

A Python scripts runner composable. Run Python scripts in a [Pyodide](https://github.com/pyodide/pyodide) service worker

## Install

### As a package

```bash
npm install usepython
# or
yarn add usepython
```

Then use it:

```ts
import { usePython } from "usepython";

const py = usePython();
```

### As script src

```html
    <script src="https://unpkg.com/usepython@0.0.3/dist/py.min.js"></script>
    <script>
      const py = $py.usePython();
    </script>
```

### As script type module

```html
    <script type="module">
      import { usePython } from "https://unpkg.com/usepython@0.0.3/dist/py.esm.js";
      const py = usePython();
    </script>
```

## Usage

### Load the runtime

Load the Python runtime:

```ts
await py.load()
```

Listen to the install log:

```ts
const unbindInstallLog = py.installLog.listen((val) => {
  console.log(`Installing Python, stage ${val.stage}: ${val.msg}`)
})
await py.load();
unbindInstallLog();
```

### Load libraries

It is possible to install some Python packages: either [packages built for Pyodide](https://pyodide.org/en/stable/usage/packages-in-pyodide.html#packages-in-pyodide), standard pip packages that will be installed with Micropip, or custom wheels 

```ts
const wheel = '/acustomwheel-0.0.1-py3-none-any.whl';
const pyodideLibs = ['pandas', 'numpy', 'bokeh'];
await py.load(pyodideLibs, ['altair', wheel, 'vega_datasets'])
```

### Run Python code

Run some Python code:

```ts
const script = `a=1
b=2
a+b`
const { result, error } = await py.run("script1", script);
```

The result is the last line of the script, just like a return value

See the [documentation](doc/modules.md)

### Listen to stdout

Listen to the Python stdout output:

```ts
const script = `print('ok from python')`;
py.log.listen((val) => {
  console.log("LOG", val.stdOut)
  // val.stdErr is also available
});
await py.run("script2", script);
```

## Examples

- [Script src](examples/umd/)
- [Script module](examples/esm/)
- [Vuejs](examples/vuejs/)
