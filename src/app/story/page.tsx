import { getStory } from "../utils/http";

export default async function Story({ searchParams }: { searchParams: { url: string }}) {
    const story = await getStory(searchParams.url);
    return (
        <div>
            <h1 className="text-[2.0rem]">{story.title}</h1>
            <div>
                {story.paragraphs.map(p => <p dangerouslySetInnerHTML={{ __html: p }} />)}
            </div>
        </div>
    );
}