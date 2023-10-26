import { FC } from "react";
import useFetchUserAnswerListByTime from "../../hooks/fetch/useFetchUserAnswerListByTime";
import { AccountInfo } from "../../models/User";
import { List, ListItem } from "@mui/material";
import AnswerCardSkeleton from "../../components/molecules/skeleton/AnswerCardSkeleton";
import AnswerCard from "../../components/molecules/AnswerCard";
import PostNotFound from "../../components/atoms/PostNotFound";
import RetryQuery from "../../components/atoms/RetryQuery";
import NotConnectionQuery from "../../components/atoms/NotConnectionQuery";

type Props = {
    user: AccountInfo;
};

const AccountAnswerContent: FC<Props> = ({ user }) => {
    const { data, isFetching, isPaused, refetch } =
        useFetchUserAnswerListByTime(user.id);

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

export default AccountAnswerContent;
