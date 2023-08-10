import {
    UseMutationResult,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Provider } from "../../models/OAuth";

type PostData = {
    name: string;
    nick_name: string;
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
            onSuccess: (data) => {
                queryClient.setQueryData(["user"], data);
            },
        }
    );
};

export default useSocialRegister;
