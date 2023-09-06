import { Box, List, ListItem } from "@mui/material";
import OdaiCardSkeleton from "../molecules/skeleton/OdaiCardSkeleton";
import { FC } from "react";
import OdaiCard from "../molecules/OdaiCard";
import OdaiMainHeader from "../molecules/OdaiMainHeader";
import useFetchThreadListByLike from "../../hooks/fetch/useFetchThreadListByLike";
import { AxiosError } from "axios";

const OdaiBoardByLike: FC = () => {
    const { data, isFetching, error, refetch } = useFetchThreadListByLike();
    const statusCode = (error as AxiosError)?.response?.status;
    return (
        <Box display="flex" flexDirection="column">
            <OdaiMainHeader refetch={refetch} />
            {statusCode && <Box>読み込めませんでした。({statusCode})</Box>}
            <List
                sx={{
                    width: "100%",
                }}
            >
                {isFetching && <OdaiCardSkeleton cardNum={10} />}

                {data?.map((data) => {
                    return (
                        <ListItem key={data.id} sx={{ width: 1, p: 0 }}>
                            <OdaiCard data={data} />
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};

export default OdaiBoardByLike;
