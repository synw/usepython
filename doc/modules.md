[Quiz documentation](README.md) / Exports

# Quiz documentation

## Table of contents

### Interfaces

- [PyInstallLog](interfaces/PyInstallLog.md)
- [PyLog](interfaces/PyLog.md)

### Functions

- [usePython](modules.md#usepython)

## Functions

### usePython

▸ **usePython**(): `Object`

The main composable

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `installLog` | `MapStore`<[`PyInstallLog`](interfaces/PyInstallLog.md)\> | The install log store |
| `isExecuting` | `ReadableAtom`<`boolean`\> | The execution state atom |
| `isReady` | `ReadableAtom`<`boolean`\> | The ready state atom |
| `load` | (`pyoPackages`: `string`[], `packages`: `string`[], `initCode`: `string`, `transformCode`: `string`) => `Promise`<{ `error`: `any` ; `results`: `any`  }\> | Load the Python runtime |
| `log` | `MapStore`<[`PyLog`](interfaces/PyLog.md)\> | The runtime log store |
| `run` | (`id`: `string`, `script`: `string`, `context`: `Record`<`string`, `any`\>) => `Promise`<{ `error`: `any` ; `results`: `any`  }\> | Run a Python script |

#### Defined in

[py.ts:5](https://github.com/synw/usepython/blob/11c2783/src/py.ts#L5)
