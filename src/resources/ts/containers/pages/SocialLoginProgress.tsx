import { FC, useEffect, useMemo, useState } from "react";
import SocialLoginProgress from "../../components/pages/SocialLoginProgress";
import queryString from "query-string";
import { useHistory, useLocation, useParams } from "react-router-dom";
import useSocailLogin from "../../hooks/auth/useSocialLogin";
import { OAuthParams, Provider } from "../../models/OAuth";

const EnhancedSocialLoginProgress: FC = () => {
    const { provider } = useParams<{ provider: Provider }>();
    const history = useHistory();
    const location = useLocation();
    const socialResponse = useMemo(
        () => queryString.parse(location.search) ?? {},
        [location.search]
    );

    const [oAuthError, setOAuthError] = useState<boolean>(false);
    const { error, mutate: socialLogin } = useSocailLogin();
    const statusCode = error?.response?.status;

    const [openForm, setOpenForm] = useState(false);
    const [nick_name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [provider_user_id, setProviderUserId] = useState("");

    useEffect(() => {
        if (Object.prototype.hasOwnProperty.call(socialResponse, "error")) {
            setOAuthError(true);
            return;
        }
        socialLogin(
            { provider, authParams: socialResponse as OAuthParams },
            {
                onSuccess: () => {
                    history.replace("/");
                },
                onError: (error) => {
                    if (error?.response?.status === 422) {
                        setName(error?.response?.data?.nick_name);
                        setEmail(error?.response?.data?.email);
                        setProviderUserId(
                            error?.response?.data?.provider_user_id
                        );
                        setOpenForm(true);
                    }
                },
            }
        );
    }, [history, provider, socialResponse, socialLogin]);

    return (
        <SocialLoginProgress
            oAuthError={oAuthError}
            statusCode={statusCode}
            openForm={openForm}
            provider={provider}
            nick_name={nick_name}
            email={email}
            provider_user_id={provider_user_id}
        />
    );
};

export default EnhancedSocialLoginProgress;
