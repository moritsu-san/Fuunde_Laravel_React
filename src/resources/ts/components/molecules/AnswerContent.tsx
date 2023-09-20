import { Box, ListItem } from "@mui/material";
import { FC } from "react";
import { Data } from "../../models/Answer";
import AnswerCardSkeleton from "./skeleton/AnswerCardSkeleton";
import AnswerCard from "./AnswerCard";

type Props = {
    isFetching: boolean;
    data?: Data[];
    statusCode?: number;
};

const AnswerContent: FC<Props> = ({ isFetching, data, statusCode }) => {
    const isData = (data?.length as number) >= 1;

    if (isFetching) {
        return <AnswerCardSkeleton cardNum={10} />;
    } else if (isData) {
        return (
            <Box>
                {data?.map((data) => {
                    return (
                        <ListItem key={data.id} sx={{ width: 1, p: 0 }}>
                            <AnswerCard data={data} />
                        </ListItem>
                    );
                })}
            </Box>
        );
    } else {
        return <Box>Retry({statusCode})</Box>;
    }
};

export default AnswerContent;
