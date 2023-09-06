import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Data from "../../models/ThreadWithAnswers";
import Thread from "../../components/pages/Thread";
import { Box } from "@mui/material";
import ThreadMainHeader from "../../components/molecules/ThreadMainHeader";

const EnhancedThread = () => {
    const { threadId } = useParams<{ threadId: string }>();
    const [thread, setThread] = useState<Data>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`/api/getThreadWithAnswers/${threadId}`)
            .then((res) => {
                setThread(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.response.status);
                setIsLoading(false);
            });
    }, []);

    return (
        <Box display="flex" flexDirection="column">
            <ThreadMainHeader />
            <Thread thread={thread} isLoading={isLoading} error={error} />
        </Box>
    );
};

export default EnhancedThread;
