import { Box, CircularProgress, List, ListItem } from "@mui/material";
import { Data } from "../../models/ThreadWithAnswers";
import { FC } from "react";
import ThreadCard from "../molecules/ThreadCard";
import ThreadPostAnswer from "../molecules/ThreadPostAnswer";
import ThreadAnswerCard from "../molecules/ThreadAnswerCard";
import Retry from "../atoms/Retry";
import { AxiosError } from "axios";
import NotFound from "./NotFound";
import NotConnection from "../atoms/NotConnection";

type Props = {
    thread?: Data;
    error?: Error;
};

const Thread: FC<Props> = ({ thread, error }) => {
    const statusCode = (error as unknown as AxiosError)?.response?.status;
    const networkError =
        (error as unknown as AxiosError)?.message === "Network Error"
            ? true
            : false;

    if (thread === undefined && !error) {
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

    if (statusCode === 404) {
        return <NotFound />;
    } else if (networkError) {
        return <NotConnection />;
    } else if (thread && typeof thread !== "string") {
        return (
            <Box display="flex" flexDirection="column">
                <ThreadCard thread={thread} />
                <ThreadPostAnswer thread={thread} />
                <List
                    sx={{
                        width: "100%",
                    }}
                >
                    {thread.answers?.map((data) => {
                        return (
                            <ListItem key={data.id} sx={{ width: 1, p: 0 }}>
                                <ThreadAnswerCard data={data} />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        );
    } else {
        return <Retry />;
    }
};

export default Thread;
