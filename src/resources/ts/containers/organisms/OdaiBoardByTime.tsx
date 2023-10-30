import { Box } from "@mui/material";
import { FC } from "react";
import OdaiMainHeader from "../../components/molecules/OdaiMainHeader";
import useFetchOdaiListByTime from "../../hooks/fetch/useFetchOdaiListByTime";
import OdaiContent from "../../components/molecules/OdaiContent";

const OdaiBoardByTime: FC = () => {
    const { data, isFetching, isPaused, refetch } = useFetchOdaiListByTime();
    return (
        <Box>
            <OdaiMainHeader refetch={refetch} />
            <OdaiContent
                isFetching={isFetching}
                data={data}
                isPaused={isPaused}
                refetch={refetch}
            />
        </Box>
    );
};

export default OdaiBoardByTime;
