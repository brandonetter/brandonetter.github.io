let wasmInstance = null;

export async function initWasm() {
  if (wasmInstance) return wasmInstance;

  try {
    const response = await fetch('/fuzzysearch/release.wasm');
    const bytes = await response.arrayBuffer();
    const results = await WebAssembly.instantiate(bytes, {
      env: {
        abort: () => {
          throw new Error('Wasm aborted');
        },
        memory: new WebAssembly.Memory({ initial: 65536 }),
        seed: Date.now,
      },
    });
    wasmInstance = results.instance.exports;
    return wasmInstance;
  } catch (err) {
    console.error('Failed to load WASM:', err);
    throw err;
  }
}

export async function searchCsvChunk(
  csvLines,
  query,
  threshold,
  startIndex,
  chunkSize
) {
  const instance = await initWasm();
  console.log(instance.fuzzySearch('hello', 'hello', 0.5));
  return instance.searchCsvChunk(
    csvLines,
    query,
    threshold,
    startIndex,
    chunkSize
  );
}
