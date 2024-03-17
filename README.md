# Use Python

[![pub package](https://img.shields.io/npm/v/usepython)](https://www.npmjs.com/package/usepython)

A Python scripts runner composable. Run Python scripts in a [Pyodide](https://github.com/pyodide/pyodide) service worker

[Api doc](https://github.com/synw/usepython/tree/main/doc)

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

The install log object is a [nanostore](https://github.com/nanostores/nanostores#maps)

### Load libraries

It is possible to install some Python packages: either [packages built for Pyodide](https://pyodide.org/en/stable/usage/packages-in-pyodide.html#packages-in-pyodide), standard pip packages that will be installed with Micropip, or custom wheels 

```ts
const wheel = '/acustomwheel-0.0.1-py3-none-any.whl';
const pyodideLibs = ['pandas', 'numpy', 'bokeh'];
await py.load(pyodideLibs, ['altair', wheel, 'vega_datasets'])
```

### Run Python code

Run some sync Python code:

```ts
const script = `a=1
b=2
a+b`
const { result, error } = await py.run(script);
```

The result is the last line of the script, just like a return value

See the [documentation](doc/modules.md)

To run async code use the `runAsync` function.

#### Namespaces

An optionnal namespace parameter can be used to isolate Python contexts:

```ts
const { result, error } = await py.run("a=1", "ns1");
```

The variable defined in the script will be accessible only in the
same namespace:

```ts
const { result, error } = await py.run("b=a+1", "ns1");
```

To flush the context of the namespace and reset all user defined
variables use the `clear` function:

```ts
await py.clear("ns1");
```

### Listen to stdout

Listen to the Python stdout output:

```ts
py.log.listen((val) => {
  console.log("LOG", val.stdOut)
  // val.stdErr is also available
});
const script = `print('ok from python')`;
await py.run(script);
```

The log object is a [nanostore](https://github.com/nanostores/nanostores#maps)

### State

[Atom stores](https://github.com/nanostores/nanostores#atoms) are available to listen to
the ready state and execution state of Python. Example:

```ts
py.isReady.listen((v) => console.log("Ready state:", v));
py.isExecuting.listen((v) => console.log("Execution state:", v));
```

Vuejs example:

```ts
import { useStore } from '@nanostores/vue';

const isExecuting: Readonly<Ref<boolean>> = useStore(py.isExecuting);
const isReady: Readonly<Ref<boolean>> = useStore(py.isReady);
```

## Examples

- [Script src](examples/umd/)
- [Script module](examples/esm/)
- [Vuejs](examples/vuejs/)

[Api doc](https://github.com/synw/usepython/tree/main/doc)
