import { Route, Switch } from "react-router-dom";
import NotFound from "../../components/pages/NotFound";
import AnswerBoardByTime from "../../components/organisms/AnswerBoardByTime";
import AnswerBoardByLike from "../../components/organisms/AnswerBoardByLike";

const Answer = () => {
    return (
        <Switch>
            <Route exact path="/answer/recent">
                <AnswerBoardByTime />
            </Route>
            <Route exact path="/answer/popular">
                <AnswerBoardByLike />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
};

export default Answer;
