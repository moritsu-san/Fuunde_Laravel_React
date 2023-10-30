import { Box } from "@mui/material";
import { FC } from "react";
import useFetchAnswerListByLike from "../../hooks/fetch/useFetchAnswerListByLike";
import AnswerMainHeader from "../../components/molecules/AnswerMainHeader";
import AnswerContent from "../../components/molecules/AnswerContent";

const AnswerBoardByLike: FC = () => {
    const { data, isFetching, isPaused, refetch } = useFetchAnswerListByLike();
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

export default AnswerBoardByLike;
