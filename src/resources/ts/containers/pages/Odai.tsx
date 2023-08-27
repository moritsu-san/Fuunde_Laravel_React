import { Box } from "@mui/material";
import useFetchThreadList from "../../hooks/fetch/useFetchThreadList";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import { Data } from "../../models/Thread";
import { AxiosError } from "axios";
import OdaiBoard from "../../components/organisms/OdaiBoard";
import ThreadMainHeader from "../../components/molecules/ThreadMainHeader";

const Odai = () => {
    const { data, isLoading, error } = useFetchThreadList();
    const statusCode = (error as AxiosError)?.response?.status;

    return (
        <Box display="flex" flexDirection="column">
            <ThreadMainHeader />
            <Switch>
                <Route exact path="/odai/recent">
                    <OdaiBoard
                        data={data as Data[]}
                        isLoading={isLoading}
                        statusCode={statusCode}
                    />
                </Route>
                <Route exact path="/odai/popular">
                    <OdaiBoard
                        data={data as Data[]}
                        isLoading={isLoading}
                        statusCode={statusCode}
                    />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Box>
    );
};

export default Odai;
