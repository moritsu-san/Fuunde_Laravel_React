import { List, ListItem } from "@mui/material";
import { FC } from "react";
import useFetchThreadAnswer from "../../hooks/fetch/useFetchThreadAnswer";
import OdaiCardSkeleton from "./skeleton/OdaiCardSkeleton";
import ThreadAnswerCard from "./ThreadAnswerCard";
import PostNotFound from "../atoms/PostNotFound";
import NotConnectionQuery from "../atoms/NotConnectionQuery";
import RetryQuery from "../atoms/RetryQuery";

type Props = {
    threadId: number;
};

const ThreadAnswerList: FC<Props> = ({ threadId }) => {
    const { data, isFetching, isPaused, refetch } =
        useFetchThreadAnswer(threadId);

    if (isFetching) {
        return (
            <List
                sx={{
                    width: "100%",
                }}
            >
                <OdaiCardSkeleton cardNum={10} />
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
                            <ThreadAnswerCard data={data} />
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

export default ThreadAnswerList;
