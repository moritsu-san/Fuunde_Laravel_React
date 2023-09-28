import { Box, List } from "@mui/material";
import { FC } from "react";
import useFetchAnswerListByTime from "../../hooks/fetch/useFetchAnswerListByTime";
import AnswerMainHeader from "../../components/molecules/AnswerMainHeader";
import AnswerContent from "../../components/molecules/AnswerContent";

const AnswerBoardByTime: FC = () => {
    const { data, isFetching, isPaused, refetch } = useFetchAnswerListByTime();
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

export default AnswerBoardByTime;
