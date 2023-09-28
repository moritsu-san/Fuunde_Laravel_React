import { Box, List } from "@mui/material";
import { FC } from "react";
import OdaiMainHeader from "../../components/molecules/OdaiMainHeader";
import useFetchOdaiListByTime from "../../hooks/fetch/useFetchOdaiListByTime";
import OdaiContent from "../../components/molecules/OdaiContent";

const OdaiBoardByTime: FC = () => {
    const { data, isFetching, isPaused, refetch } = useFetchOdaiListByTime();
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

export default OdaiBoardByTime;
