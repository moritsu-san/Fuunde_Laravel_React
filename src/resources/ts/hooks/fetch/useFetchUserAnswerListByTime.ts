import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { answerData } from "../../models/Answer";

const fetchUserAnswerListByTime = async (userId: number) => {
    const { data } = await axios.get<answerData[]>(
        `/api/getAnswersWithThreadByTime/${userId}`
    );
    return data;
};

const useFetchUserAnswerListByTime = (userId: number) => {
    return useQuery<answerData[]>(
        ["user_answers"],
        () => fetchUserAnswerListByTime(userId),
        { retry: 1 }
    );
};

export default useFetchUserAnswerListByTime;
