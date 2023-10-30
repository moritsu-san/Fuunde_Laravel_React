import { Box } from "@mui/material";
import { FC } from "react";
import useFetchAnswerListByTime from "../../hooks/fetch/useFetchAnswerListByTime";
import AnswerMainHeader from "../../components/molecules/AnswerMainHeader";
import AnswerContent from "../../components/molecules/AnswerContent";

const AnswerBoardByTime: FC = () => {
    const { data, isFetching, isPaused, refetch } = useFetchAnswerListByTime();
    return (
        <Box>
            <AnswerMainHeader refetch={refetch} />
            <AnswerContent
                isFetching={isFetching}
                data={data}
                isPaused={isPaused}
                refetch={refetch}
            />
        </Box>
    );
};

export default AnswerBoardByTime;
