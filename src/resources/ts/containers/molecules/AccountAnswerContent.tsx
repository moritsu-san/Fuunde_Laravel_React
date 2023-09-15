import { FC } from "react";
import useFetchUserAnswerListByTime from "../../hooks/fetch/useFetchUserAnswerListByTime";
import { AccountInfo } from "../../models/User";
import { Box, List, ListItem } from "@mui/material";
import AnswerCardSkeleton from "../../components/molecules/skeleton/AnswerCardSkeleton";
import AnswerCard from "../../components/molecules/AnswerCard";
import { AxiosError } from "axios";

type Props = {
    user: AccountInfo;
};

const AccountAnswerContent: FC<Props> = ({ user }) => {
    const { data, isFetching, error } = useFetchUserAnswerListByTime(user.id);
    const statusCode = (error as AxiosError)?.response?.status;
    if (isFetching) {
        return (
            <List
                sx={{
                    width: "100%",
                }}
            >
                <AnswerCardSkeleton cardNum={10} />\
            </List>
        );
    } else if (statusCode) {
        return <Box>読み込めませんでした。({statusCode})</Box>;
    } else if (data?.length) {
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
    } else {
        return <Box>アンサーの投稿がまだありません。</Box>;
    }
};

export default AccountAnswerContent;
