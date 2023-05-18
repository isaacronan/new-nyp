import { PropsWithChildren } from "react";
import { getSummaries } from "../utils/http";
import { NewsTile } from "./news-tile";

export const NewsTilelist = async (props: PropsWithChildren<{ path: string }>) => {
    const summaries = await getSummaries(props.path);
    return (
        <div>
            {summaries.map(summary => (
                <div className="mb-[1.0rem]">
                    <NewsTile summary={summary} />
                </div>
            ))}
        </div>
    );
}