import { Box, List } from "@mui/material";
import Data from "../../models/ThreadWithAnswers";
import { FC } from "react";
import AnswerCardSkeleton from "../molecules/skeleton/AnswerCardSkeleton";
import ThreadCard from "../molecules/ThreadCard";
import ThreadPostAnswer from "../molecules/ThreadPostAnswer";

type Props = {
    thread?: Data;
    isLoading: boolean;
    error?: number;
};

const Thread: FC<Props> = ({ thread, isLoading, error }) => {
    if (isLoading) {
        return (
            <List
                sx={{
                    width: "100%",
                }}
            >
                <AnswerCardSkeleton cardNum={10} />
            </List>
        );
    } else if (error === 404) {
        return <h1>スレッドが存在しません</h1>;
    } else if (thread) {
        return (
            <Box display="flex" flexDirection="column">
                <ThreadCard thread={thread} />
                <ThreadPostAnswer thread={thread} />
            </Box>
        );
    } else {
        return <h1>ReTry</h1>;
    }
};

export default Thread;
