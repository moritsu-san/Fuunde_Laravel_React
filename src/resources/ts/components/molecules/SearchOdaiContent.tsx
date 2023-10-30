import { ListItem } from "@mui/material";
import OdaiCardSkeleton from "./skeleton/OdaiCardSkeleton";
import { FC } from "react";
import { odaiData } from "../../models/Odai";
import OdaiCard from "./OdaiCard";
import { UseQueryResult } from "@tanstack/react-query";
import NotConnectionQuery from "../atoms/NotConnectionQuery";
import RetryQuery from "../atoms/RetryQuery";
import PostNotFound from "../atoms/PostNotFound";

type Props = {
    isFetching: boolean;
    data?: odaiData[];
    isPaused: boolean;
    refetch: (options?: {
        throwOnError: boolean;
        cancelRefetch: boolean;
    }) => Promise<UseQueryResult>;
};

const SearchOdaiContent: FC<Props> = ({
    isFetching,
    data,
    isPaused,
    refetch,
}) => {
    if (isFetching) {
        return (
            <ul>
                <OdaiCardSkeleton cardNum={10} />
            </ul>
        );
    }

    if (data && typeof data !== "string" && data?.length !== 0) {
        return (
            <ul>
                {data?.map((data) => {
                    return (
                        <ListItem key={data.id} sx={{ width: 1, p: 0 }}>
                            <OdaiCard data={data} />
                        </ListItem>
                    );
                })}
            </ul>
        );
    } else if (data?.length === 0) {
        return <PostNotFound />;
    } else if (isPaused) {
        return <NotConnectionQuery refetch={refetch} />;
    } else {
        return <RetryQuery refetch={refetch} />;
    }
};

export default SearchOdaiContent;
