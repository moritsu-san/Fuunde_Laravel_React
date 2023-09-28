import axios from "axios";
import { useParams } from "react-router-dom";
import Thread from "../../components/pages/Thread";
import { Box } from "@mui/material";
import ThreadMainHeader from "../../components/molecules/ThreadMainHeader";
import { useEffect, useState } from "react";
import { Data } from "../../models/ThreadWithAnswers";

const EnhancedThread = () => {
    const { threadId } = useParams<{ threadId: string }>();
    const [data, setData] = useState<Data>();
    const [error, setError] = useState();

    const fetchThreadWithAnswers = async () => {
        await axios
            .get<Data>(`/api/getThreadWithAnswers/${threadId}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                setError(error);
                console.log(error.toJSON());
            });
        return data;
    };

    useEffect(() => {
        fetchThreadWithAnswers();
    }, []);

    return (
        <Box display="flex" flexDirection="column">
            <ThreadMainHeader />
            <Thread thread={data} error={error} />
        </Box>
    );
};

export default EnhancedThread;
