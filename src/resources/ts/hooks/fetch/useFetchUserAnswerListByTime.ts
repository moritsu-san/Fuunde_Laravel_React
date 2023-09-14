import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Answer";

const fetchUserAnswerListByTime = async (userId: number) => {
    const { data } = await axios.get<Data[]>(
        `/api/getAnswersWithThreadByTime/${userId}`
    );
    return data;
};

const useFetchUserAnswerListByTime = (userId: number) => {
    return useQuery<Data[]>(["user_answers"], () =>
        fetchUserAnswerListByTime(userId)
    );
};

export default useFetchUserAnswerListByTime;
