import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Thread";

const fetchThreadListByTime = async () => {
    const { data } = await axios.get<Data[]>("/api/getThreadsByTime");
    if (typeof data === "object") {
        return data;
    }
    return [];
};

const useFetchThreadListByTime = () => {
    return useQuery<Data[]>(["odais"], fetchThreadListByTime);
};

export default useFetchThreadListByTime;
