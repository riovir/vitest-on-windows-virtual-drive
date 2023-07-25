# Vitest 0.33.0 reproduction

_I can't run Vitest using TypeScript from a partitioned drive on Windows 10._

## Setup
- on Windows 10 Pro and Enterprise version 22H2 (build: 19045.3208)
- have the repo cloned to
  - a partitioned drive
  - or create one with `subst Z: E:\[location_of_the_repo]`

## Reproduce
- clone and `npm ci` the reproduction
- `cd` into the repo from a virtual drive (subst-created or partitioned)
- run `npm test` or `npm run debug` (for a bit more context)

## Observed
- The `@vitest/runner/dist/index.js:176:22` throws an error, as `getCurrentSuite()` returns `undefined`.
- Changing the `test.spec.ts` to `test.spec.js` avoids the error. It seems to be somewhat tied to TypeScript or needing to process the test files first.
- The stack trace shows the original drive path to the files even when ran from a virtual drive. Could trip something up. (See `npm run debug`)

```
something is wrong... TypeError: Cannot read properties of undefined (reading 'test')
    at Object.<anonymous> (file:///E:/workspaces/vitest-on-windows-virtual-drive/node_modules/@vitest/runner/dist/index.js:176:22)
    at Module.chain2 (file:///E:/workspaces/vitest-on-windows-virtual-drive/node_modules/@vitest/runner/dist/utils.js:99:17)
    at Z:\vitest-on-windows-virtual-drive\test.spec.ts:3:1
    at VitestExecutor.directRequest (file:///Z:/vitest-on-windows-virtual-drive/node_modules/vite-node/dist/client.mjs:341:5)
    at VitestExecutor.cachedRequest (file:///Z:/vitest-on-windows-virtual-drive/node_modules/vite-node/dist/client.mjs:197:14)
    at VitestExecutor.executeId (file:///Z:/vitest-on-windows-virtual-drive/node_modules/vite-node/dist/client.mjs:173:12)
    at DebugRunner.importFile (Z:\vitest-on-windows-virtual-drive\debug-runner.ts:7:20)
    at collectTests (file:///Z:/vitest-on-windows-virtual-drive/node_modules/@vitest/runner/dist/index.js:447:7)
    at startTests (file:///Z:/vitest-on-windows-virtual-drive/node_modules/@vitest/runner/dist/index.js:765:17)
    at file:///Z:/vitest-on-windows-virtual-drive/node_modules/vitest/dist/entry.js:278:7
```