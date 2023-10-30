import { ListItem } from "@mui/material";
import { FC } from "react";
import { answerData } from "../../models/Answer";
import AnswerCardSkeleton from "./skeleton/AnswerCardSkeleton";
import AnswerCard from "./AnswerCard";
import { UseQueryResult } from "@tanstack/react-query";
import NotConnectionQuery from "../atoms/NotConnectionQuery";
import RetryQuery from "../atoms/RetryQuery";

type Props = {
    isFetching: boolean;
    data?: answerData[];
    isPaused: boolean;
    refetch: (options?: {
        throwOnError: boolean;
        cancelRefetch: boolean;
    }) => Promise<UseQueryResult>;
};

const AnswerContent: FC<Props> = ({ isFetching, data, isPaused, refetch }) => {
    if (isFetching) {
        return (
            <ul>
                <AnswerCardSkeleton cardNum={10} />
            </ul>
        );
    }

    if (data && typeof data !== "string") {
        return (
            <ul>
                {data?.map((data) => {
                    return (
                        <ListItem key={data.id} sx={{ width: 1, p: 0 }}>
                            <AnswerCard data={data} />
                        </ListItem>
                    );
                })}
            </ul>
        );
    } else if (isPaused) {
        return <NotConnectionQuery refetch={refetch} />;
    } else {
        return <RetryQuery refetch={refetch} />;
    }
};

export default AnswerContent;
