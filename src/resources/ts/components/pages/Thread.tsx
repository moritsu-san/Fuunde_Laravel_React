import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";
import ThreadOdaiCard from "../molecules/ThreadOdaiCard";
import ThreadPostAnswer from "../molecules/ThreadPostAnswer";
import NotFound from "./NotFound";
import { UseQueryResult } from "@tanstack/react-query";
import NotConnectionQuery from "../atoms/NotConnectionQuery";
import RetryQuery from "../atoms/RetryQuery";
import { odaiData } from "../../models/Odai";
import ThreadAnswerList from "../molecules/ThreadAnswerList";

type Props = {
    isFetching: boolean;
    data?: odaiData;
    isPaused: boolean;
    refetch: (options?: {
        throwOnError: boolean;
        cancelRefetch: boolean;
    }) => Promise<UseQueryResult>;
    statuscode?: number;
};

const Thread: FC<Props> = ({
    isFetching,
    data,
    isPaused,
    refetch,
    statuscode,
}) => {
    if (isFetching) {
        return (
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                py="20px"
            >
                <CircularProgress size={30} />
            </Box>
        );
    }

    if (data && typeof data !== "string") {
        return (
            <Box>
                <ThreadOdaiCard thread={data} />
                <ThreadPostAnswer thread={data} />
                <ThreadAnswerList threadId={data.id} />
            </Box>
        );
    } else if (statuscode === 404) {
        return <NotFound />;
    } else if (isPaused) {
        return <NotConnectionQuery refetch={refetch} />;
    } else {
        return <RetryQuery refetch={refetch} />;
    }
};

export default Thread;
