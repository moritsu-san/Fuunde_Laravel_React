import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Thread";

const fetchThreadListByTime = async () => {
    const { data } = await axios.get<Data[]>("/api/getThreadsByTime");
    return data;
};

const useFetchThreadListByTime = () => {
    return useQuery<Data[]>(["threads"], fetchThreadListByTime);
};

export default useFetchThreadListByTime;
