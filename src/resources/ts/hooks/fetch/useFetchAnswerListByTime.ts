import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Answer";

const fetchAnswerListByTime = async () => {
    const { data } = await axios.get<Data[]>("/api/getAnswersWithThreadByTime");
    return data;
};

const useFetchAnswerListByTime = () => {
    return useQuery<Data[]>(["answersByTime"], fetchAnswerListByTime);
};

export default useFetchAnswerListByTime;
