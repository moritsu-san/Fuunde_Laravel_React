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
            }
        );
    }, [history, provider, socialResponse, socialLogin]);

    return <SocialLoginProgress oAuthError= {oAuthError} statusCode={statusCode}/>;
};

export default EnhancedSocialLoginProgress;
