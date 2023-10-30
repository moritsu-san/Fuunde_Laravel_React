import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { odaiData } from "../../models/Odai";

const fetchThreadOdai = async (threadId: string) => {
    const { data } = await axios.get<odaiData>(`/api/getThread/${threadId}`);
    return data;
};

const useFetchThreadOdai = (threadId: string) => {
    return useQuery<odaiData>(["thread_odai", threadId], () =>
        fetchThreadOdai(threadId)
    );
};

export default useFetchThreadOdai;
