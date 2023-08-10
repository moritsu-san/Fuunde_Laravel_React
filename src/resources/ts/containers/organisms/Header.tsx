import { FC, useCallback } from "react";
import Header from "../../components/organisms/Header";
import useCurrentUser from "../../hooks/user/useCurrentUser";
import { useHistory } from "react-router-dom";
import useLogout from "../../hooks/auth/useLogout";

const EnhancedHeader: FC = () => {
    const history = useHistory();

    const user = useCurrentUser();

    const { mutate, isLoading: logoutIsLoading } = useLogout();

    const handleLogout = useCallback(() => {
        mutate(undefined, {
            onSuccess: () => {
                history.push("/login");
            },
        });
    }, [history, mutate]);

    return (
        <Header
            username={user?.username}
            name={user?.name}
            handleLogout={handleLogout}
            logoutIsLoading={logoutIsLoading}
        />
    );
};

export default EnhancedHeader;
