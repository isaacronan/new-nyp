import { Suspense } from "react";
import { getStory } from "../utils/http";
import Image from "next/image";

export default async function Story({ searchParams }: { searchParams: { url: string }}) {
    const story = await getStory(searchParams.url);
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <h1 className="text-[2.0rem]">{story.title}</h1>
                <div className="flex">
                    {story.media.map(url => (
                        <Image
                            src={`${url}?h=400`}
                            width={400}
                            height={400}
                            className="max-w-[40.0rem] max-h-[40.0rem]"
                            alt={''}
                        />
                    ))}
                </div>
                <div>
                    {story.paragraphs.map(p => <p dangerouslySetInnerHTML={{ __html: p }} />)}
                </div>
            </Suspense>
        </div>
    );
}