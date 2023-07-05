import {
    UseMutationResult,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { OAuthParams, Provider } from "../../models/OAuth";
import axios, { AxiosError } from "axios";
import { User } from "../../models/User";

const socialLogin = async (
    provider: Provider,
    authParams: OAuthParams
): Promise<User> => {
    const { data } = await axios.post(
        `/api/login/${provider}/callback`,
        authParams
    );
    return data;
};

const useSocailLogin = (): UseMutationResult<
    User,
    AxiosError,
    { provider: Provider; authParams: OAuthParams },
    undefined
> => {
    const queryClient = useQueryClient();
    return useMutation(({ provider, authParams }) => socialLogin(provider, authParams), {
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
        },
    });
};

export default useSocailLogin;
