import { Box } from "@mui/material";
import { FC } from "react";
import OdaiMainHeader from "../../components/molecules/OdaiMainHeader";
import useFetchOdaiListByLike from "../../hooks/fetch/useFetchOdaiListByLike";
import OdaiContent from "../../components/molecules/OdaiContent";

const OdaiBoardByLike: FC = () => {
    const { data, isFetching, isPaused, refetch } = useFetchOdaiListByLike();
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

export default OdaiBoardByLike;
