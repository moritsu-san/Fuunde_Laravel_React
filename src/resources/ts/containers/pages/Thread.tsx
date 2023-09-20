import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import Thread from "../../components/pages/Thread";
import { Box, CircularProgress } from "@mui/material";
import ThreadMainHeader from "../../components/molecules/ThreadMainHeader";
import { useEffect, useState } from "react";
import { Data } from "../../models/ThreadWithAnswers";

const EnhancedThread = () => {
    const { threadId } = useParams<{ threadId: string }>();
    const [data, setData] = useState<Data>();
    const [error, setError] = useState();
    const statusCode = (error as unknown as AxiosError)?.response?.status;
    const [isFetching, setIsFetching] = useState(false);

    const fetchThreadWithAnswers = async () => {
        setIsFetching(true);
        await axios
            .get<Data>(`/api/getThreadWithAnswers/${threadId}`)
            .then((res) => {
                if ("body" in res.data) {
                    setData(res.data);
                }
                setIsFetching(false);
            })
            .catch((error) => {
                setError(error);
                setIsFetching(false);
            });
        return data;
    };

    useEffect(() => {
        fetchThreadWithAnswers();
    }, []);

    return isFetching ? (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            py="20px"
        >
            <CircularProgress size={30} />
        </Box>
    ) : (
        <Box display="flex" flexDirection="column">
            <ThreadMainHeader />
            <Thread thread={data} statusCode={statusCode} />
        </Box>
    );
};

export default EnhancedThread;
