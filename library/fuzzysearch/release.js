// eslint-disable-next-line @typescript-eslint/no-require-imports

async function instantiate(module, imports = {}) {
  const { exports } = await WebAssembly.instantiate(module, imports);
  return exports;
}
export const { memory, add } = await (async url =>
  instantiate(
    await (async () => {
      const isNodeOrBun =
        typeof process != 'undefined' &&
        process.versions != null &&
        (process.versions.node != null || process.versions.bun != null);
      if (isNodeOrBun) {
        return globalThis.WebAssembly.compile(await fetch(url));
      } else {
        return await globalThis.WebAssembly.compileStreaming(
          globalThis.fetch(url)
        );
      }
    })(),
    {}
  ))(new URL('/public/release.wasm', import.meta.url));
