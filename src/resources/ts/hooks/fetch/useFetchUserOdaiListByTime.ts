import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Thread";

const fetchUserOdaiListByTime = async (userId: number) => {
    const { data } = await axios.get<Data[]>(
        `/api/getThreadsByTime/${userId}`
    );
    return data;
};

const useFetchUserOdaiListByTime = (userId: number) => {
    return useQuery<Data[]>(["user_odais"], () =>
        fetchUserOdaiListByTime(userId)
    );
};

export default useFetchUserOdaiListByTime;
