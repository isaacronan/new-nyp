import { getStory } from "../utils/http";

export default async function Story({ searchParams }: { searchParams: { url: string }}) {
    const story = await getStory(searchParams.url);
    return (
        <>
            {story.paragraphs.map(p => <p dangerouslySetInnerHTML={{ __html: p }} />)}
        </>
    );
}