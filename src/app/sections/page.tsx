import { Suspense } from 'react';
import { NewsTilelist } from '../components/news-tile-list';
import { sections } from '../utils/sections';

export default async function Section({ params }: { params: { section: string }}) {
  return (
    <main className="flex flex-col items-center">
      <h2 className="text-[3.0rem]">{sections[0].title}</h2>
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <NewsTilelist path={sections[0].path} />
      </Suspense>
    </main>
  )
}
