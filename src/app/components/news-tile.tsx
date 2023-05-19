import { PropsWithChildren } from "react";
import { ISummary } from "../utils/http";
import Link from "next/link";
import Image from "next/image";

export const NewsTile = (props: PropsWithChildren<{ summary: ISummary }>) => {
    return (
        <Link prefetch={false} href={`/story?url=${props.summary.link}`}>
            <div className="flex">
                <div className="basis-[10.0rem] flex flex-col items-center">
                    {props.summary.media.length !== 0 && <Image
                        src={`${props.summary.media[0].url}?h=100`}
                        width={100}
                        height={100}
                        className="max-w-[10.0rem] max-h-[10.0rem]"
                        alt={props.summary.media[0].title || ''}
                    />}
                </div>
                <div>
                    <h3 className="text-[2.0rem]" dangerouslySetInnerHTML={{ __html: props.summary.title }} />
                    <div dangerouslySetInnerHTML={{ __html: props.summary.description }} />
                </div>
            </div>
        </Link>
    );
}