import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Data } from "../../models/Thread";

const fetchThreadOdai = async (threadId: string) => {
    const { data } = await axios.get<Data>(
        `/api/getThread/${threadId}`
    );
    return data;
};

const useFetchThreadOdai = (threadId: string) => {
    return useQuery<Data>(["thread_odai", threadId], () => fetchThreadOdai(threadId));
};

export default useFetchThreadOdai;
