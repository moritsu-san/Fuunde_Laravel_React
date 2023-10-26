import { Box, List } from "@mui/material";
import { FC } from "react";
import OdaiMainHeader from "../../components/molecules/OdaiMainHeader";
import useFetchOdaiListByLike from "../../hooks/fetch/useFetchOdaiListByLike";
import OdaiContent from "../../components/molecules/OdaiContent";

const OdaiBoardByLike: FC = () => {
    const { data, isFetching, isPaused, refetch } = useFetchOdaiListByLike();
    return (
        <Box display="flex" flexDirection="column">
            <OdaiMainHeader refetch={refetch} />
            <List
                sx={{
                    width: "100%",
                }}
            >
                <OdaiContent
                    isFetching={isFetching}
                    data={data}
                    isPaused={isPaused}
                    refetch={refetch}
                />
            </List>
        </Box>
    );
};

export default OdaiBoardByLike;
