import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { answerData } from "../../models/ThreadWithAnswers";

const fetchThreadAnswer = async (threadId: number) => {
    const { data } = await axios.get<answerData[]>(
        `/api/getAnswer/${threadId}`
    );
    return data;
};

const useFetchThreadAnswer = (threadId: number) => {
    return useQuery<answerData[]>(
        ["thread_answer", threadId],
        () => fetchThreadAnswer(threadId),
        { retry: 1 }
    );
};

export default useFetchThreadAnswer;
