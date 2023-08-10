import { Box } from "@mui/material";
import useFetchThreadList from "../../hooks/fetch/useFetchThreadList";
import MainHeader from "../../components/molecules/MainHeader";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import { Data } from "../../models/Thread";
import { AxiosError } from "axios";
import AnswerBoard from "../../components/organisms/AnswerBoard";

const Answer = () => {
    const { data, isLoading, error } = useFetchThreadList();
    console.log(data);
    const statusCode = (error as AxiosError)?.response?.status;

    return (
        <Box display="flex" flexDirection="column">
            <MainHeader />
            <Switch>
                <Route exact path="/answer/recent">
                    <AnswerBoard
                        data={data as Data[]}
                        isLoading={isLoading}
                        statusCode={statusCode}
                    />
                </Route>
                <Route exact path="/answer/popular">
                    <AnswerBoard
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

export default Answer;
