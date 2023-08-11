import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Answer";

const fetchAnswerList = async () => {
    const { data } = await axios.get<Data[]>("/api/getAnswersWithThread");
    return data;
};

const useFetchAnswerList = () => {
    return useQuery<Data[]>(["answers"], fetchAnswerList);
};

export default useFetchAnswerList;
