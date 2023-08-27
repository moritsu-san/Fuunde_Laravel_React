import { Box, List, ListItem } from "@mui/material";
import { FC } from "react";
import AnswerCard from "../molecules/AnswerCard";
import AnswerCardSkeleton from "../molecules/skeleton/AnswerCardSkeleton";
import useFetchAnswerListByTime from "../../hooks/fetch/useFetchAnswerListByTime";
import { AxiosError } from "axios";
import AnswerMainHeader from "../molecules/AnswerMainHeader";

const AnswerBoardByTime: FC = () => {
    const { data, isFetching, error, refetch } = useFetchAnswerListByTime();
    const statusCode = (error as AxiosError)?.response?.status;
    return (
        <Box display="flex" flexDirection="column">
            <AnswerMainHeader refetch={refetch} />
            {statusCode && <Box>読み込めませんでした。({statusCode})</Box>}
            <List
                sx={{
                    width: "100%",
                }}
            >
                {isFetching && <AnswerCardSkeleton cardNum={10} />}

                {data?.map((data) => {
                    return (
                        <ListItem key={data.id} sx={{ width: 1, p: 0 }}>
                            <AnswerCard data={data} />
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};

export default AnswerBoardByTime;
