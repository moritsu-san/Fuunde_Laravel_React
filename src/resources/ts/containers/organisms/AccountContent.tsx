import { FC } from "react";
import { AccountInfo as Data } from "../../models/User";
import { CircularProgress } from "@mui/material";
import AccountInfo from "../../components/organisms/AccountInfo";
import { Route, Switch } from "react-router-dom";
import NotFound from "../pages/NotFound";
import AccountAnswerContent from "../molecules/AccountAnswerContent";
import AccountOdaiContent from "../molecules/AccountOdaiContent";

type Props = {
    data?: Data;
    isLoading: boolean;
    statusCode?: number;
};

const AccountContent: FC<Props> = ({ data, isLoading, statusCode }) => {
    if (isLoading) {
        return <CircularProgress />;
    } else if (statusCode === 404) {
        return <h1>アカウントが存在しません</h1>;
    } else if (data) {
        return (
            <>
                <AccountInfo user={data} />
                <Switch>
                    <Route exact path={`/user/${data.username}`}>
                        <AccountAnswerContent user={data} />
                    </Route>
                    <Route exact path={`/user/${data.username}/odai`}>
                        <AccountOdaiContent user={data} />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </>
        );
    } else {
        return <h1>ReTry</h1>;
    }
};

export default AccountContent;
