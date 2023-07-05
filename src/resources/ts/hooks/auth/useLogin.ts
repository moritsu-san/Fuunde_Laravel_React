import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LoginForm } from "../../models/LoginForm";

const login = async (formData: LoginForm) => {
    const { data } = await axios.post("/api/login", formData);
    return data;
};

const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation(login, {
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
        },
    });
};

export default useLogin;
