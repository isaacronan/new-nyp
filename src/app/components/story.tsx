import { PropsWithChildren } from "react";
import { getStory } from "../utils/http";
import Image from "next/image";

export const Story = async (props: PropsWithChildren<{ url: string }>) => {
    const story = await getStory(props.url);

    return (
        <>
            <h1 className="text-[2.0rem]">{story.title}</h1>
            <div className="flex flex-wrap">
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
        </>
    )
}