import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Data from "../../models/ThreadWithAnswers";

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

    if (isLoading) {
        return <CircularProgress />;
    } else if (error === 404) {
        return <h1>スレッドが存在しません</h1>;
    } else if (thread) {
        return <h1>{thread.body}</h1>;
    } else {
        return <h1>ReTry</h1>;
    }
};

export default EnhancedThread;
