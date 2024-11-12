'use client';
interface Wasm {
  add(a: number, b: number): number;
}
import { useEffect, useState } from 'react';

export default function Index() {
  const [wasm, setWasm] = useState<Wasm>();
  useEffect(() => {
    async function loadWasm() {
      const wasm = await import('@/library/fuzzysearch/release');
      setWasm(wasm);
    }
    loadWasm();
  }, []);
  return <div>Our WASM component: {wasm ? wasm.add(1, 2) : 'Loading...'}</div>;
}
