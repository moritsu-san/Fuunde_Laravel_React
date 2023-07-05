import { FC, useCallback } from "react";
import Header from "../../components/organisms/Header";
import useCurrentUser from "../../hooks/user/useCurrentUser";
import { useHistory } from "react-router-dom";
import useLogout from "../../hooks/auth/useLogout";

const EnhancedHeader: FC = () => {
    const user = useCurrentUser();

    const history = useHistory();
    const { mutate } = useLogout();

    const handleLogout = useCallback(() => {
        mutate(undefined, {
            onSuccess: () => {
                history.push("/login");
            },
        });
    }, [history, mutate]);

    return <Header userName={user?.name} userEmail={user?.email} handleLogout={handleLogout}/>;
};

export default EnhancedHeader;
