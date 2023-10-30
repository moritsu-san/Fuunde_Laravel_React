import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { odaiData } from "../../models/Odai";

const fetchOdaiListByTime = async () => {
    const { data } = await axios.get<odaiData[]>("/api/getThreadsByTime");
    return data;
};

const useFetchOdaiListByTime = () => {
    return useQuery<odaiData[]>(["odaisByTime"], fetchOdaiListByTime);
};

export default useFetchOdaiListByTime;
