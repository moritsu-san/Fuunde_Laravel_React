import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Thread";

const fetchThreadList = async () => {
    const { data } = await axios.get<Data[]>("/api/getThreadsWithAnswers");
    return data;
};

const useFetchThreadList = () => {
    return useQuery<Data[]>(["threads"], fetchThreadList);
};

export default useFetchThreadList;
