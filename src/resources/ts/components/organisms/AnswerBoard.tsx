import { Box, List, ListItem } from "@mui/material";
import ThreadCardSkeleton from "../molecules/skeleton/ThreadCardSkeleton";
import { Data } from "../../models/Answer";
import { FC } from "react";
import AnswerCard from "../molecules/AnswerCard";

type Props = {
    data: Data[];
    isLoading: boolean;
    statusCode: number | undefined;
};

const AnswerBoard: FC<Props> = ({ data, isLoading, statusCode }) => {
    return (
        <>
            {statusCode && <Box>読み込めませんでした。({statusCode})</Box>}
            <List
                sx={{
                    width: "100%",
                }}
            >
                {isLoading && <ThreadCardSkeleton cardNum={10} />}

                {data?.map((data) => {
                    return (
                        <ListItem key={data.id} sx={{ width: 1, p: 0 }}>
                            <AnswerCard data={data} />
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
};

export default AnswerBoard;
