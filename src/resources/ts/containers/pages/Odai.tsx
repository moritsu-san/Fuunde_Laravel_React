import { Route, Switch } from "react-router-dom";
import NotFound from "../../components/pages/NotFound";
import OdaiBoardByTime from "../organisms/OdaiBoardByTime";
import OdaiBoardByLike from "../organisms/OdaiBoardByLike";

const Odai = () => {
    return (
        <Switch>
            <Route exact path="/odai/recent">
                <OdaiBoardByTime />
            </Route>
            <Route exact path="/odai/popular">
                <OdaiBoardByLike />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
};

export default Odai;
