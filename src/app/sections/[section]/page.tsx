import { Suspense } from 'react';
import { NewsTilelist } from '../../components/news-tile-list';
import { sections } from '../../utils/sections';

export default async function Section({ params }: { params: { section: string }}) {
  const section = sections.find(section => section.path.startsWith(`/${params.section}`))!;
  return (
    <main className="flex flex-col items-center">
      <h2 className="text-[3.0rem]" dangerouslySetInnerHTML={{ __html: section.title }} />
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <NewsTilelist path={section.path} />
      </Suspense>
    </main>
  )
}
