import { FC, useCallback, useMemo } from "react";
import Header from "../../components/organisms/Header";
import useCurrentUser from "../../hooks/user/useCurrentUser";
import { useHistory, useLocation } from "react-router-dom";
import useLogout from "../../hooks/auth/useLogout";

const EnhancedHeader: FC = () => {
    const history = useHistory();
    const location = useLocation();

    const user = useMemo(() => useCurrentUser(), [history, location]);

    const { mutate } = useLogout();

    const handleLogout = useCallback(() => {
        mutate(undefined, {
            onSuccess: () => {
                history.push("/login");
            },
        });
    }, [history, mutate]);

    return (
        <Header
            userName={user?.name}
            userNickName={user?.nick_name}
            handleLogout={handleLogout}
        />
    );
};

export default EnhancedHeader;
