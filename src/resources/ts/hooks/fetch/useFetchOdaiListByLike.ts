import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Thread";

const fetchOdaiListByLike = async () => {
    const { data } = await axios.get<Data[]>("/api/getThreadsByLike");
    return data;
};

const useFetchOdaiListByLike = () => {
    return useQuery<Data[]>(["odaisByLike"], fetchOdaiListByLike);
};

export default useFetchOdaiListByLike;
