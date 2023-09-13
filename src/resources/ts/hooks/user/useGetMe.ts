import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../../models/User";
import axios from "axios";

const getLoginUser = async (): Promise<User> => {
    const { data } = await axios.get("/api/users/me");
    return data;
};

const useGetMe = () => {
    const queryClient = useQueryClient();
    return useQuery(["user"], getLoginUser, {
        retry: 0,
        initialData: undefined,
        onError: () => {
            queryClient.setQueryData(["user"], null);
        },
    });
};

export default useGetMe;
