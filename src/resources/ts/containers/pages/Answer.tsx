import { Box, CircularProgress, List, ListItem } from "@mui/material";
import useFetchThreadList from "../../hooks/fetch/useFetchThreadList";
import MainHeader from "../../components/molecules/MainHeader";
import AnswerCard from "../../components/molecules/AnswerCard";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";

const Answer = () => {
    const { data, isLoading, error } = useFetchThreadList();

    return (
        <Box display="flex" flexDirection="column">
            <MainHeader />
            <Switch>
                <Route exact path="/answer">
                    <List
                        sx={{
                            width: "100%",
                        }}
                    >
                        {isLoading && (
                            <CircularProgress
                                sx={{ display: "block", mt: 3, mx: "auto" }}
                            />
                        )}
                        {data?.map((data) => {
                            return (
                                <ListItem>
                                    <AnswerCard data={data} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Route>
                <Route exact path="/answer/popular">
                    <List
                        sx={{
                            width: "100%",
                        }}
                    >
                        {isLoading && (
                            <CircularProgress
                                sx={{ display: "block", mt: 3, mx: "auto" }}
                            />
                        )}
                        {data?.map((data) => {
                            return (
                                <ListItem>
                                    <AnswerCard data={data} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Box>
    );
};

export default Answer;
