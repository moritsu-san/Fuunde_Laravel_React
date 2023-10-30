import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { odaiData } from "../../models/Odai";

const fetchUserOdaiListByTime = async (userId: number) => {
    const { data } = await axios.get<odaiData[]>(`/api/getThreadsByTime/${userId}`);
    return data;
};

const useFetchUserOdaiListByTime = (userId: number) => {
    return useQuery<odaiData[]>(["user_odais"], () =>
        fetchUserOdaiListByTime(userId)
    );
};

export default useFetchUserOdaiListByTime;
