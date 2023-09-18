import { Box, List, ListItem } from "@mui/material";
import { Data } from "../../models/ThreadWithAnswers";
import { FC } from "react";
import ThreadCard from "../molecules/ThreadCard";
import ThreadPostAnswer from "../molecules/ThreadPostAnswer";
import ThreadAnswerCard from "../molecules/ThreadAnswerCard";

type Props = {
    thread?: Data;
    statusCode?: number;
};

const Thread: FC<Props> = ({ thread, statusCode }) => {
    if (statusCode === 404) {
        return <h1>スレッドが存在しません</h1>;
    } else if (thread) {
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
        return <h1>ReTry</h1>;
    }
};

export default Thread;
