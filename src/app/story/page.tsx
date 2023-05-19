import { getStory } from "../utils/http";

export default async function Story({ searchParams }: { searchParams: { url: string }}) {
    const story = await getStory(searchParams.url);
    return (
        <ul>
            {story.paragraphs.map(p => <li>{p}</li>)}
        </ul>
    );
}