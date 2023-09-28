import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Thread";

const fetchOdaiListByTime = async () => {
    const { data } = await axios.get<Data[]>("/api/getThreadsByTime");
    return data;
};

const useFetchOdaiListByTime = () => {
    return useQuery<Data[]>(["odaisByTime"], fetchOdaiListByTime);
};

export default useFetchOdaiListByTime;
