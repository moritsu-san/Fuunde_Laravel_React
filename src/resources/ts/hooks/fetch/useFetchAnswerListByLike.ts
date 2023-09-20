import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Answer";

const fetchAnswerListByLike = async () => {
    const { data } = await axios.get<Data[]>("/api/getAnswersWithThreadByLike");
    if (typeof data === "object") {
        return data;
    }
    return [];
};

const useFetchAnswerListByLike = () => {
    return useQuery<Data[]>(["answers"], fetchAnswerListByLike);
};

export default useFetchAnswerListByLike;
