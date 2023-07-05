import { SubmitHandler, useForm } from "react-hook-form";
import Register from "../../components/pages/Register";
import { RegisterForm } from "../../models/RegisterForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHistory, useLocation } from "react-router-dom";
import useRegister from "../../hooks/auth/useRegiter";
import { AxiosError } from "axios";
import useOAuthUrl from "../../hooks/auth/useOAuthUrl";
import { Provider } from "../../models/OAuth";
import { registerSchema } from "../../constants/registerSchema";

const EnhancedRegister = () => {
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<RegisterForm>({
        mode: "onChange",
        criteriaMode: "all",
        resolver: zodResolver(registerSchema),
    });

    const history = useHistory();
    const location = useLocation();
    const { from } = (location.state as { from: string }) || {
        from: { pathname: "/" },
    };

    const { error, isLoading: registerIsLoading, mutate } = useRegister();
    const statusCode = (error as AxiosError)?.response?.status;
    const resNameErrors = (error as AxiosError)?.response?.data?.errors?.name;
    const resEmailErrors = (error as AxiosError)?.response?.data?.errors?.email;
    console.log((error as AxiosError)?.response);

    const {
        error: socialLoginError,
        isLoading: socialLoginIsLoading,
        mutate: redirectOAuth,
    } = useOAuthUrl();

    const socialLoginStatusCode = (socialLoginError as AxiosError)?.response
        ?.status;
    const isLoading = registerIsLoading || socialLoginIsLoading;

    const handleRegister: SubmitHandler<RegisterForm> = (data, event?) => {
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
        <Register
            register={register}
            handleSubmit={handleSubmit}
            isValid={isValid}
            errors={errors}
            handleRegister={handleRegister}
            statusCode={statusCode}
            socialLoginStatusCode={socialLoginStatusCode}
            isLoading={isLoading}
            handleSocialLoginRequest={handleSocialLoginRequest}
        />
    );
};

export default EnhancedRegister;
