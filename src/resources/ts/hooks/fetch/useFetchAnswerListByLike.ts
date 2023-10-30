import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { answerData } from "../../models/Answer";

const fetchAnswerListByLike = async () => {
    const { data } = await axios.get<answerData[]>("/api/getAnswersWithThreadByLike");
    return data;
};

const useFetchAnswerListByLike = () => {
    return useQuery<answerData[]>(["answersByLike"], fetchAnswerListByLike);
};

export default useFetchAnswerListByLike;
