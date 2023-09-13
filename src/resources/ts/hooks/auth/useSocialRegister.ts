import {
    UseMutationResult,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Provider } from "../../models/OAuth";

type PostData = {
    username: string;
    name: string;
    email: string;
    provider_user_id: string;
};

const register = async (provider: Provider, postData: PostData) => {
    const { data } = await axios.post(
        `/api/register/${provider}/callback`,
        postData
    );
    return data;
};

const useSocialRegister = (): UseMutationResult<
    PostData,
    AxiosError,
    { provider: Provider; postData: PostData },
    undefined
> => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ provider, postData }) => register(provider, postData),
        {
            onSuccess: (data, variables) => {
                queryClient.setQueryData(["user"], data);
                queryClient.setQueryData(
                    ["openSnackbar"],
                    `${variables.provider}でログインしました!`
                );
            },
        }
    );
};

export default useSocialRegister;
