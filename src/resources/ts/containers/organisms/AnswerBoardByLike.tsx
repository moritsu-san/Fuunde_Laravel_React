import { Box, List } from "@mui/material";
import { FC } from "react";
import useFetchAnswerListByLike from "../../hooks/fetch/useFetchAnswerListByLike";
import AnswerMainHeader from "../../components/molecules/AnswerMainHeader";
import AnswerContent from "../../components/molecules/AnswerContent";

const AnswerBoardByLike: FC = () => {
    const { data, isFetching, isPaused, refetch } = useFetchAnswerListByLike();
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
                    isPaused={isPaused}
                    refetch={refetch}
                />
            </List>
        </Box>
    );
};

export default AnswerBoardByLike;
