import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AccountInfo } from "../../models/User";

const fetchAccountInfo = async (username: string) => {
    const { data } = await axios.get<AccountInfo>(
        `/api/getAccountInfo/${username}`
    );
    return data;
};

const useFetchAccountInfo = (username: string) => {
    return useQuery<AccountInfo>(
        ["account"],
        () => fetchAccountInfo(username),
        {
            retry: 0,
            initialData: undefined,
        }
    );
};

export default useFetchAccountInfo;
