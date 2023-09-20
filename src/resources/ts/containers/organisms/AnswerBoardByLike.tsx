import { Box, List } from "@mui/material";
import { FC } from "react";
import { AxiosError } from "axios";
import useFetchAnswerListByLike from "../../hooks/fetch/useFetchAnswerListByLike";
import AnswerMainHeader from "../../components/molecules/AnswerMainHeader";
import AnswerContent from "../../components/molecules/AnswerContent";

const AnswerBoardByLike: FC = () => {
    const { data, isFetching, error, refetch } = useFetchAnswerListByLike();
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

export default AnswerBoardByLike;
