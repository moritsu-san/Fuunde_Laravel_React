import { Box } from "@mui/material";
import AnswerMainHeader from "../../components/molecules/AnswerMainHeader";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import { Data } from "../../models/Answer";
import { AxiosError } from "axios";
import AnswerBoard from "../../components/organisms/AnswerBoard";
import useFetchAnswerList from "../../hooks/fetch/useFetchAnswerList";

const Answer = () => {
    const { data, isLoading, error } = useFetchAnswerList();
    console.log(data);
    const statusCode = (error as AxiosError)?.response?.status;

    return (
        <Box display="flex" flexDirection="column">
            <AnswerMainHeader />
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
