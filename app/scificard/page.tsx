import ScifiCard from '@/components/scificard/ScifiCard';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row gap-8 row-start-2 items-center sm:items-start">
        <ScifiCard
          text="Hello, World!"
          subtext="This is a subtext"
          image="/scificard/bg1.png"
        />
        <ScifiCard
          text="Hello, Two!"
          subtext="subtext subtext"
          image="/scificard/bg2.jpeg"
        />
        <ScifiCard
          text="Hello Three"
          subtext="subtext"
          image="/scificard/bg3.jpg"
        />
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
