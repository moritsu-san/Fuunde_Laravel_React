import { Box, List } from "@mui/material";
import { FC } from "react";
import OdaiMainHeader from "../../components/molecules/OdaiMainHeader";
import useFetchThreadListByTime from "../../hooks/fetch/useFetchThreadListByTime";
import { AxiosError } from "axios";
import OdaiContent from "../../components/molecules/OdaiContent";

const OdaiBoardByTime: FC = () => {
    const { data, isFetching, error, refetch } = useFetchThreadListByTime();
    const statusCode = (error as AxiosError)?.response?.status;
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
                    statusCode={statusCode}
                />
            </List>
        </Box>
    );
};

export default OdaiBoardByTime;
