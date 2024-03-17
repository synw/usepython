[Documentation](README.md) / Exports

# Documentation

## Table of contents

### Interfaces

- [PyInstallLog](interfaces/PyInstallLog.md)
- [PyLog](interfaces/PyLog.md)
- [PyRunner](interfaces/PyRunner.md)

### Type Aliases

- [PyClearMethod](modules.md#pyclearmethod)
- [PyLoadMethod](modules.md#pyloadmethod)
- [PyRunAsyncMethod](modules.md#pyrunasyncmethod)
- [PyRunMethod](modules.md#pyrunmethod)

### Functions

- [usePython](modules.md#usepython)

## Type Aliases

### PyClearMethod

Ƭ **PyClearMethod**: (`namespace`: `string`) => `Promise`\<\{ `error`: `any` ; `results`: `any`  }\>

Type for the `clear` method of the PyRunner interface.

#### Type declaration

▸ (`namespace`): `Promise`\<\{ `error`: `any` ; `results`: `any`  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespace` | `string` | The namespace to clear. |

##### Returns

`Promise`\<\{ `error`: `any` ; `results`: `any`  }\>

#### Defined in

[interfaces.ts:172](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L172)

___

### PyLoadMethod

Ƭ **PyLoadMethod**: (`pyoPackages?`: `string`[], `packages?`: `string`[], `initCode?`: `string`, `transformCode?`: `string`) => `Promise`\<\{ `error`: `any` ; `results`: `any`  }\>

Type for the `load` method of the PyRunner interface.

#### Type declaration

▸ (`pyoPackages?`, `packages?`, `initCode?`, `transformCode?`): `Promise`\<\{ `error`: `any` ; `results`: `any`  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pyoPackages?` | `string`[] | Optional array of Python packages to load. |
| `packages?` | `string`[] | Optional array of additional packages to load. |
| `initCode?` | `string` | Optional initialization code to run. |
| `transformCode?` | `string` | Optional transformation code to run. |

##### Returns

`Promise`\<\{ `error`: `any` ; `results`: `any`  }\>

#### Defined in

[interfaces.ts:127](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L127)

___

### PyRunAsyncMethod

Ƭ **PyRunAsyncMethod**: (`script`: `string`, `namespace?`: `string`, `id?`: `string`, `context?`: `Record`\<`string`, `any`\>) => `Promise`\<\{ `error`: `any` ; `results`: `any`  }\>

Type for the `runAsync` method of the PyRunner interface.

#### Type declaration

▸ (`script`, `namespace?`, `id?`, `context?`): `Promise`\<\{ `error`: `any` ; `results`: `any`  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `script` | `string` | The Python script to run. |
| `namespace?` | `string` | Optional namespace for the script. |
| `id?` | `string` | Optional identifier for the script execution. |
| `context?` | `Record`\<`string`, `any`\> | Optional context for the script execution. |

##### Returns

`Promise`\<\{ `error`: `any` ; `results`: `any`  }\>

#### Defined in

[interfaces.ts:159](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L159)

___

### PyRunMethod

Ƭ **PyRunMethod**: (`script`: `string`, `namespace?`: `string`, `id?`: `string`, `context?`: `Record`\<`string`, `any`\>) => `Promise`\<\{ `error`: `any` ; `results`: `any`  }\>

Type for the `run` method of the PyRunner interface.

#### Type declaration

▸ (`script`, `namespace?`, `id?`, `context?`): `Promise`\<\{ `error`: `any` ; `results`: `any`  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `script` | `string` | The Python script to run. |
| `namespace?` | `string` | Optional namespace for the script. |
| `id?` | `string` | Optional identifier for the script execution. |
| `context?` | `Record`\<`string`, `any`\> | Optional context for the script execution. |

##### Returns

`Promise`\<\{ `error`: `any` ; `results`: `any`  }\>

#### Defined in

[interfaces.ts:143](https://github.com/synw/usepython/blob/58a3740/src/interfaces.ts#L143)

## Functions

### usePython

▸ **usePython**(): [`PyRunner`](interfaces/PyRunner.md)

The main composable

#### Returns

[`PyRunner`](interfaces/PyRunner.md)

#### Defined in

[py.ts:6](https://github.com/synw/usepython/blob/58a3740/src/py.ts#L6)
