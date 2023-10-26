import { List, ListItem } from "@mui/material";
import { FC } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import NotConnectionQuery from "../atoms/NotConnectionQuery";
import RetryQuery from "../atoms/RetryQuery";
import PostNotFound from "../atoms/PostNotFound";
import AnswerCardSkeleton from "./skeleton/AnswerCardSkeleton";
import { Data } from "../../models/Answer";
import AnswerCard from "./AnswerCard";

type Props = {
    isFetching: boolean;
    data?: Data[];
    isPaused: boolean;
    refetch: (options?: {
        throwOnError: boolean;
        cancelRefetch: boolean;
    }) => Promise<UseQueryResult>;
};

const SearchAnswerContent: FC<Props> = ({ isFetching, data, isPaused, refetch }) => {
    if (isFetching) {
        return (
            <List
                sx={{
                    width: "100%",
                }}
            >
                <AnswerCardSkeleton cardNum={10} />
            </List>
        );
    }

    if (data && typeof data !== "string" && data?.length !== 0) {
        return (
            <List
                sx={{
                    width: "100%",
                }}
            >
                {data?.map((data) => {
                    return (
                        <ListItem key={data.id} sx={{ width: 1, p: 0 }}>
                            <AnswerCard data={data} />
                        </ListItem>
                    );
                })}
            </List>
        );
    } else if (data?.length === 0) {
        return <PostNotFound />;
    } else if (isPaused) {
        return <NotConnectionQuery refetch={refetch} />;
    } else {
        return <RetryQuery refetch={refetch} />;
    }
};

export default SearchAnswerContent;
