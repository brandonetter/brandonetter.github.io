'use client';
import { add } from '@/library/fuzzysearch/release';
import { useEffect } from 'react';
export default function StandardSearch() {
  useEffect(() => {
    add(1, 2);
  }, []);
  return (
    <section>
      <div>asads</div>
    </section>
  );
}
