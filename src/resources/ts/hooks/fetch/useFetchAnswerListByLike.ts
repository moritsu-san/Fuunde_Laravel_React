import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Answer";

const fetchAnswerListByLike = async () => {
    const { data } = await axios.get<Data[]>("/api/getAnswersWithThreadByLike");
    return data;
};

const useFetchAnswerListByLike = () => {
    return useQuery<Data[]>(["answersByLike"], fetchAnswerListByLike);
};

export default useFetchAnswerListByLike;
