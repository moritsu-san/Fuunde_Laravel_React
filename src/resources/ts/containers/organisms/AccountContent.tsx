import { FC } from "react";
import { AccountInfo as Data } from "../../models/User";
import AccountInfo from "../../components/organisms/AccountInfo";
import { Route, Switch, useParams } from "react-router-dom";
import AccountAnswerContent from "../molecules/AccountAnswerContent";
import AccountOdaiContent from "../molecules/AccountOdaiContent";
import AccountInfoHeader from "../../components/molecules/AccountInfoHeader";
import AccountNotFound from "../../components/organisms/AccountNotFound";
import AccountPageNotFound from "../../components/organisms/AccountPageNotFound";
import { UseQueryResult } from "@tanstack/react-query";
import { Box, CircularProgress } from "@mui/material";
import NotConnectionQuery from "../../components/atoms/NotConnectionQuery";
import RetryQuery from "../../components/atoms/RetryQuery";

type Props = {
    isFetching: boolean;
    data?: Data;
    isPaused: boolean;
    refetch: (options?: {
        throwOnError: boolean;
        cancelRefetch: boolean;
    }) => Promise<UseQueryResult>;
    statuscode?: number;
};

const AccountContent: FC<Props> = ({
    isFetching,
    data,
    isPaused,
    refetch,
    statuscode,
}) => {
    const { username } = useParams<{ username: string }>();

    if (isFetching) {
        return (
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                py="20px"
            >
                <CircularProgress size={30} />
            </Box>
        );
    }

    if (data && typeof data !== "string") {
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
    } else if (statuscode === 404) {
        return <AccountNotFound username={username} />;
    } else if (isPaused) {
        return <NotConnectionQuery refetch={refetch} />;
    } else {
        return <RetryQuery refetch={refetch} />;
    }
};

export default AccountContent;
