import { FC } from "react";
import { AccountInfo as Data } from "../../models/User";
import AccountInfo from "../../components/organisms/AccountInfo";
import { Route, Switch, useParams } from "react-router-dom";
import AccountAnswerContent from "../molecules/AccountAnswerContent";
import AccountOdaiContent from "../molecules/AccountOdaiContent";
import AccountInfoHeader from "../../components/molecules/AccountInfoHeader";
import AccountNotFound from "../../components/organisms/AccountNotFound";
import AccountPageNotFound from "../../components/organisms/AccountPageNotFound";
import Retry from "../../components/atoms/Retry";
import { AxiosError } from "axios";
import NotConnection from "../../components/atoms/NotConnection";

type Props = {
    data?: Data;
    error?: Error;
};

const AccountContent: FC<Props> = ({ data, error }) => {
    const { username } = useParams<{ username: string }>();
    const statusCode = (error as unknown as AxiosError)?.response?.status;
    const networkError =
        (error as unknown as AxiosError)?.message === "Network Error"
            ? true
            : false;

    if (statusCode === 404) {
        return <AccountNotFound username={username} />;
    } else if (networkError) {
        return <NotConnection />;
    } else if (data && typeof data !== "string") {
        return (
            <>
                <AccountInfo user={data} />
                <AccountInfoHeader username={data.username} />
                <Switch>
                    <Route exact path={`/user/${data.username}`}>
                        <AccountAnswerContent user={data} />
                    </Route>
                    <Route exact path={`/user/${data.username}/odai`}>
                        <AccountOdaiContent user={data} />
                    </Route>
                    <Route path="*">
                        <AccountPageNotFound username={data.username} />
                    </Route>
                </Switch>
            </>
        );
    } else {
        return <Retry />;
    }
};

export default AccountContent;
