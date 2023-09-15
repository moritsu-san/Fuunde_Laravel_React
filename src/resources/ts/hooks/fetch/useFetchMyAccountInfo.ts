import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AccountInfo } from "../../models/User";

const fetchAccountInfo = async (username: string) => {
    console.log(username);
    const { data } = await axios.get<AccountInfo>(
        `/api/getAccountInfo/${username}`
    );
    console.log(data);
    return data;
};

const useFetchMyAccountInfo = (username: string) => {
    console.log(username);
    return useQuery<AccountInfo>(
        ["account"],
        () => fetchAccountInfo(username),
        {
            retry: 0,
            initialData: undefined,
        }
    );
};

export default useFetchMyAccountInfo;
