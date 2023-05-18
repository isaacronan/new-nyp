import { PropsWithChildren } from "react";
import { ISummary } from "../utils/http";

export const NewsTile = (props: PropsWithChildren<{ summary: ISummary }>) => {
    return (
        <div className="flex">
            <img height="100" width="100" src={props.summary.media[0].url} alt="" />
            <div>
                <h3 className="text-[2.0rem]">{props.summary.title}</h3>
                <div>{props.summary.description}</div>
            </div>
        </div>
    );
}