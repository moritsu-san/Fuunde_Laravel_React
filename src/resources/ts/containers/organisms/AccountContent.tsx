import { FC } from "react";
import { AccountInfo as Data } from "../../models/User";
import AccountInfo from "../../components/organisms/AccountInfo";
import { Route, Switch, useParams } from "react-router-dom";
import AccountAnswerContent from "../molecules/AccountAnswerContent";
import AccountOdaiContent from "../molecules/AccountOdaiContent";
import AccountInfoHeader from "../../components/molecules/AccountInfoHeader";
import AccountNotFound from "../../components/organisms/AccountNotFound";
import AccountPageNotFound from "../../components/organisms/AccountPageNotFound";

type Props = {
    data?: Data;
    statusCode?: number;
};

const AccountContent: FC<Props> = ({ data, statusCode }) => {
    const { username } = useParams<{ username: string }>();
    if (statusCode === 404) {
        return <AccountNotFound username={username} />;
    } else if (data) {
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
        return <h1>ReTry</h1>;
    }
};

export default AccountContent;
