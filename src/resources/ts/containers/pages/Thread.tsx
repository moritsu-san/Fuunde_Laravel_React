import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import Thread from "../../components/pages/Thread";
import { Box } from "@mui/material";
import ThreadMainHeader from "../../components/molecules/ThreadMainHeader";
import useFetchThreadWithAnswers from "../../hooks/fetch/useFetchThreadWithAnswers";

const EnhancedThread = () => {
    const { threadId } = useParams<{ threadId: string }>();
    const { data, isLoading, error, refetch } =
        useFetchThreadWithAnswers(threadId);
    const statusCode = (error as AxiosError)?.response?.status;

    return (
        <Box display="flex" flexDirection="column">
            <ThreadMainHeader />
            <Thread
                thread={data}
                isLoading={isLoading}
                statusCode={statusCode}
            />
        </Box>
    );
};

export default EnhancedThread;
