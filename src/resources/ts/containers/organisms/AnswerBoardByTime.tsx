import { Box, List } from "@mui/material";
import { FC } from "react";
import useFetchAnswerListByTime from "../../hooks/fetch/useFetchAnswerListByTime";
import { AxiosError } from "axios";
import AnswerMainHeader from "../../components/molecules/AnswerMainHeader";
import AnswerContent from "../../components/molecules/AnswerContent";

const AnswerBoardByTime: FC = () => {
    const { data, isFetching, error, refetch } = useFetchAnswerListByTime();
    const statusCode = (error as AxiosError)?.response?.status;
    return (
        <Box display="flex" flexDirection="column">
            <AnswerMainHeader refetch={refetch} />
            <List
                sx={{
                    width: "100%",
                }}
            >
                <AnswerContent
                    isFetching={isFetching}
                    data={data}
                    statusCode={statusCode}
                />
            </List>
        </Box>
    );
};

export default AnswerBoardByTime;
