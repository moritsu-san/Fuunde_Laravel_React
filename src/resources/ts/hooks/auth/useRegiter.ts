import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterForm } from "../../models/RegisterForm";
import axios from "axios";

const register = async (registerForm: RegisterForm) => {
    const { data } = await axios.post("/api/register", registerForm);
    return data;
};

const useRegister = () => {
    const queryClient = useQueryClient();
    return useMutation(register, {
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
            queryClient.setQueryData(
                ["openSnackbar"],
                "ユーザ登録が完了しログインしました!"
            );
        },
        networkMode: "offlineFirst",
    });
};

export default useRegister;
