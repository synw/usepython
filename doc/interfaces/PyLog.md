[Documentation](../README.md) / [Exports](../modules.md) / PyLog

# Interface: PyLog

Represents a log entry for a Python execution.

## Table of contents

### Properties

- [exception](PyLog.md#exception)
- [id](PyLog.md#id)
- [stdErr](PyLog.md#stderr)
- [stdOut](PyLog.md#stdout)

## Properties

### exception

• **exception**: `string`

Exception message, if any occurred during the execution.

#### Defined in

[interfaces.ts:30](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L30)

___

### id

• **id**: `string`

Unique identifier for the log entry.

#### Defined in

[interfaces.ts:12](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L12)

___

### stdErr

• **stdErr**: `string`[]

Array of standard error messages.

#### Defined in

[interfaces.ts:24](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L24)

___

### stdOut

• **stdOut**: `string`[]

Array of standard output messages.

#### Defined in

[interfaces.ts:18](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L18)
