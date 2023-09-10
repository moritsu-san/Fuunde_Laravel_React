import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/ThreadWithAnswers";

const fetchThreadWithAnswers = async (threadId: string) => {
    const { data } = await axios.get<Data>(
        `/api/getThreadWithAnswers/${threadId}`
    );
    return data;
};

const useFetchThreadWithAnswers = (threadId: string) => {
    return useQuery<Data>(["thread"], () => fetchThreadWithAnswers(threadId), {
        retry: 0,
        initialData: undefined,
    });
};

export default useFetchThreadWithAnswers;
