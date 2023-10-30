import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { answerData } from "../../models/Answer";

const fetchAnswerListByTime = async () => {
    const { data } = await axios.get<answerData[]>("/api/getAnswersWithThreadByTime");
    return data;
};

const useFetchAnswerListByTime = () => {
    return useQuery<answerData[]>(["answersByTime"], fetchAnswerListByTime);
};

export default useFetchAnswerListByTime;
