import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { User } from "../../models/User";
import axios from "axios";

const getLoginUser =async (): Promise<User> => {
    const { data } = await axios.get('/api/users/me');
    return data;
};

const useGetUserQuery = (options?: (Omit<UseQueryOptions<User, unknown, User, string[]>, "initialData" | "queryFn" | "queryKey"> & { initialData?: (() => undefined) | undefined; }) | undefined) => {
    return useQuery(['user'], getLoginUser, options);
};
    
export default useGetUserQuery;