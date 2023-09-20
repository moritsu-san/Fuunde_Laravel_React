import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Thread";

const fetchThreadListByLike = async () => {
    const { data } = await axios.get<Data[]>("/api/getThreadsByLike");
    if (typeof data === "object") {
        return data;
    }
    return [];
};

const useFetchThreadListByLike = () => {
    return useQuery<Data[]>(["odais"], fetchThreadListByLike);
};

export default useFetchThreadListByLike;
