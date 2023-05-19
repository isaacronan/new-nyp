import { Suspense } from "react";
import { Story } from "../components/story";

export default async function StoryPage({ searchParams }: { searchParams: { url: string }}) {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                {/* @ts-expect-error Async Server Component */}
                <Story url={searchParams.url} />
            </Suspense>
        </div>
    );
}