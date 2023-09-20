import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Answer";

const fetchAnswerListByTime = async () => {
    const { data } = await axios.get<Data[]>("/api/getAnswersWithThreadByTime");
    if (typeof data === "object") {
        return data;
    }
    return [];
};

const useFetchAnswerListByTime = () => {
    return useQuery<Data[]>(["answers"], fetchAnswerListByTime);
};

export default useFetchAnswerListByTime;
