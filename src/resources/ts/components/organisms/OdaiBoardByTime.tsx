import { Box, List, ListItem } from "@mui/material";
import ThreadCardSkeleton from "../molecules/skeleton/ThreadCardSkeleton";
import { FC } from "react";
import ThreadCard from "../molecules/ThreadCard";
import ThreadMainHeader from "../molecules/ThreadMainHeader";
import useFetchThreadListByTime from "../../hooks/fetch/useFetchThreadListByTime";
import { AxiosError } from "axios";

const OdaiBoardByTime: FC = () => {
    const { data, isFetching, error, refetch } = useFetchThreadListByTime();
    const statusCode = (error as AxiosError)?.response?.status;
    return (
        <Box display="flex" flexDirection="column">
            <ThreadMainHeader refetch={refetch}/>
            {statusCode && <Box>読み込めませんでした。({statusCode})</Box>}
            <List
                sx={{
                    width: "100%",
                }}
            >
                {isFetching && <ThreadCardSkeleton cardNum={10} />}

                {data?.map((data) => {
                    return (
                        <ListItem key={data.id} sx={{ width: 1, p: 0 }}>
                            <ThreadCard data={data} />
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};

export default OdaiBoardByTime;
