import { useHistory, useLocation } from "react-router-dom";
import useLogin from "../../hooks/auth/useLogin";
import Login from "../../components/pages/Login";
import { AxiosError } from "axios";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm } from "../../models/LoginForm";
import useOAuthUrl from "../../hooks/auth/useOAuthUrl";
import { Provider } from "../../models/OAuth";

const schema = z.object({
    email: z.string().email({ message: "メールアドレス形式ではありません。" }),
    password: z
        .string()
        .min(8, { message: "8文字以上入力する必要があります。" }),
});

const EnhancedLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<LoginForm>({
        mode: "onChange",
        criteriaMode: "all",
        resolver: zodResolver(schema),
    });

    const history = useHistory();
    const location = useLocation();
    const { from } = (location.state as { from: string }) || {
        from: { pathname: "/" },
    };

    const { error, isLoading: loginIsLoading, mutate } = useLogin();
    const statusCode = (error as AxiosError)?.response?.status;
    const resEmailErrors = (error as AxiosError)?.response?.data?.errors?.email;

    const {
        error: socialLoginError,
        isLoading: socialLoginIsLoading,
        mutate: redirectOAuth,
    } = useOAuthUrl();

    const socialLoginStatusCode = (socialLoginError as AxiosError)?.response
        ?.status;
    const isLoading = loginIsLoading || socialLoginIsLoading;

    const handleLogin: SubmitHandler<LoginForm> = (data, event?) => {
        event?.preventDefault();
        mutate(data, {
            onSuccess: () => {
                history.replace(from);
            },
        });
    };

    const handleSocialLoginRequest = (provider: Provider) => {
        redirectOAuth(provider);
    };

    return (
        <Login
            register={register}
            handleSubmit={handleSubmit}
            isValid={isValid}
            errors={errors}
            resEmailErrors={resEmailErrors}
            handleLogin={handleLogin}
            statusCode={statusCode}
            socialLoginStatusCode={socialLoginStatusCode}
            isLoading={isLoading}
            handleSocialLoginRequest={handleSocialLoginRequest}
        />
    );
};

export default EnhancedLogin;
