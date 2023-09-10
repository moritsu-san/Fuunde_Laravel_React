import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Thread";

const fetchThreadListByLike = async () => {
    const { data } = await axios.get<Data[]>("/api/getThreadsByLike");
    return data;
};

const useFetchThreadListByLike = () => {
    return useQuery<Data[]>(["odais"], fetchThreadListByLike);
};

export default useFetchThreadListByLike;
