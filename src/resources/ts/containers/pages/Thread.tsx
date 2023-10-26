import { useParams } from "react-router-dom";
import Thread from "../../components/pages/Thread";
import { Box } from "@mui/material";
import ThreadMainHeader from "../../components/molecules/ThreadMainHeader";
import useFetchThreadOdai from "../../hooks/fetch/useFetchThreadOdai";
import { AxiosError } from "axios";

const EnhancedThread = () => {
    const { threadId } = useParams<{ threadId: string }>();
    const { data, isFetching, isPaused, error, refetch } = useFetchThreadOdai(threadId);
    const statuscode = (error as unknown as AxiosError)?.response?.status

    return (
        <Box display="flex" flexDirection="column">
            <ThreadMainHeader />
            <Thread
                isFetching={isFetching}
                data={data}
                isPaused={isPaused}
                refetch={refetch}
                statuscode={statuscode}
            />
        </Box>
    );
};

export default EnhancedThread;
