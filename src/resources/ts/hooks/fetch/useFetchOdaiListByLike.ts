import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { odaiData } from "../../models/Odai";

const fetchOdaiListByLike = async () => {
    const { data } = await axios.get<odaiData[]>("/api/getThreadsByLike");
    return data;
};

const useFetchOdaiListByLike = () => {
    return useQuery<odaiData[]>(["odaisByLike"], fetchOdaiListByLike);
};

export default useFetchOdaiListByLike;
