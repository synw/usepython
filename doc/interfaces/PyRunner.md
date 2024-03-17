[Documentation](../README.md) / [Exports](../modules.md) / PyRunner

# Interface: PyRunner

Interface for a Python runner object.

## Table of contents

### Properties

- [clear](PyRunner.md#clear)
- [installLog](PyRunner.md#installlog)
- [isExecuting](PyRunner.md#isexecuting)
- [isReady](PyRunner.md#isready)
- [load](PyRunner.md#load)
- [log](PyRunner.md#log)
- [run](PyRunner.md#run)
- [runAsync](PyRunner.md#runasync)

## Properties

### clear

• **clear**: [`PyClearMethod`](../modules.md#pyclearmethod)

Method to clear a namespace.

**`Param`**

The namespace to clear.

#### Defined in

[interfaces.ts:91](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L91)

___

### installLog

• **installLog**: `MapStore`\<[`PyInstallLog`](PyInstallLog.md)\>

Store for installation logs.

#### Defined in

[interfaces.ts:97](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L97)

___

### isExecuting

• **isExecuting**: `ReadableAtom`\<`boolean`\>

Atom representing whether the runner is currently executing a script.

#### Defined in

[interfaces.ts:109](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L109)

___

### isReady

• **isReady**: `ReadableAtom`\<`boolean`\>

Atom representing whether the runner is ready to execute scripts.

#### Defined in

[interfaces.ts:115](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L115)

___

### load

• **load**: [`PyLoadMethod`](../modules.md#pyloadmethod)

Method to load Python packages.

**`Param`**

Optional array of Python packages to load.

**`Param`**

Optional array of additional packages to load.

**`Param`**

Optional initialization code to run.

**`Param`**

Optional transformation code to run.

#### Defined in

[interfaces.ts:64](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L64)

___

### log

• **log**: `MapStore`\<[`PyLog`](PyLog.md)\>

Store for execution logs.

#### Defined in

[interfaces.ts:103](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L103)

___

### run

• **run**: [`PyRunMethod`](../modules.md#pyrunmethod)

Method to run a Python script synchronously.

**`Param`**

The Python script to run.

**`Param`**

Optional namespace for the script.

**`Param`**

Optional identifier for the script execution.

**`Param`**

Optional context for the script execution.

#### Defined in

[interfaces.ts:74](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L74)

___

### runAsync

• **runAsync**: [`PyRunAsyncMethod`](../modules.md#pyrunasyncmethod)

Method to run a Python script asynchronously.

**`Param`**

The Python script to run.

**`Param`**

Optional namespace for the script.

**`Param`**

Optional identifier for the script execution.

**`Param`**

Optional context for the script execution.

#### Defined in

[interfaces.ts:84](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L84)
