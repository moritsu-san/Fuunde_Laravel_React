import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterForm } from "../../models/RegisterForm";
import axios from "axios";

const register = async (registerForm: RegisterForm) => {
    console.log(registerForm);
    const { data } = await axios.post("/api/register", registerForm);
    return data;
};

const useRegister = () => {
    const queryClient = useQueryClient();
    return useMutation(register, {
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
        },
    });
};

export default useRegister;
