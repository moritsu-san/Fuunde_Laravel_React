import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const logout = async () => {
    const { data } = await axios.post("/api/logout");
    return data;
};

const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation(logout, {
        onSuccess: () => {
            queryClient.resetQueries(["user"]);
        },
    });
};

export default useLogout;
