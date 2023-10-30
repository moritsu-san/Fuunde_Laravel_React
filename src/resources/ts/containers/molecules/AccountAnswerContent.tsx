import { FC } from "react";
import useFetchUserAnswerListByTime from "../../hooks/fetch/useFetchUserAnswerListByTime";
import { AccountInfo } from "../../models/User";
import { ListItem } from "@mui/material";
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
            <ul>
                <AnswerCardSkeleton cardNum={10} />
            </ul>
        );
    }

    if (data && typeof data !== "string" && data?.length !== 0) {
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
    } else if (data?.length === 0) {
        return <PostNotFound />;
    } else if (isPaused) {
        return <NotConnectionQuery refetch={refetch} />;
    } else {
        return <RetryQuery refetch={refetch} />;
    }
};

export default AccountAnswerContent;
