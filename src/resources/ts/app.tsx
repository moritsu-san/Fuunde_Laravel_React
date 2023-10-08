/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
require("./bootstrap");

import ReactDOM from "react-dom/client";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:3000/";

import Login from "./containers/pages/Login";
import NotFound from "./components/pages/NotFound";
import Answer from "./containers/pages/Answer";
import Register from "./containers/pages/Register";

import useCurrentUser from "./hooks/user/useCurrentUser";
import useGetMe from "./hooks/user/useGetMe";
import Loading from "./components/pages/Loading";
import {
    Box,
    Container,
    CssBaseline,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { themeOptions } from "./constants/themeOptions";
import SocialLoginProgress from "./containers/pages/SocialLoginProgress";
import Account from "./containers/pages/Account";
import Header from "./containers/organisms/Header";
import SideBar from "./containers/organisms/SideBar";
import Setting from "./containers/pages/Setting";
import Notifications from "./containers/pages/Notifications";
import { grey } from "@mui/material/colors";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Odai from "./containers/pages/Odai";
import Thread from "./containers/pages/Thread";
import SuccessSnackBar from "./components/atoms/SuccessSnackBar";
import useOpenSuccessSnackbar from "./hooks/snackbar/useOpenSuccessSnackbar";
import SearchThread from "./containers/pages/SearchThread";
import Explore from "./containers/pages/Explore";

const client = new QueryClient();

type Props = {
    exact?: boolean;
    path: string;
    children: ReactNode;
};

const UnAuthRoute: FC<Props> = ({ exact = false, path, children }) => {
    const user = useCurrentUser();
    return (
        <Route
            exact={exact}
            path={path}
            render={() =>
                user ? <Redirect to={{ pathname: "/" }} /> : children
            }
        />
    );
};

const AuthRoute: FC<Props> = ({ exact = false, path, children }) => {
    const user = useCurrentUser();
    return (
        <Route
            exact={exact}
            path={path}
            render={(routeProps: any) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: routeProps.location },
                        }}
                    />
                )
            }
        />
    );
};

const App = () => {
    const sh = window.screen.height;

    const { data } = useOpenSuccessSnackbar();

    const { isLoading, isFetching } = useGetMe();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container fixed disableGutters maxWidth="xl" sx={{ display: "flex" }}>
            <Header />
            <Box component="main" width="100%" flexGrow="2" flexShrink="1">
                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            md: "600px",
                            lg: "930px",
                            xl: "990px",
                        },
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: { sm: "600px" },
                            minHeight: `${sh}px`,
                            m: 0,
                            borderLeft: 1,
                            borderRight: 1,
                            borderColor: grey[300],
                            zIndex: 1,
                            flexGrow: 1,
                        }}
                    >
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Redirect
                                        to={{ pathname: "/answer/recent" }}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/answer"
                                render={() => (
                                    <Redirect
                                        to={{ pathname: "/answer/recent" }}
                                    />
                                )}
                            />
                            <Route path="/answer">
                                <Answer />
                            </Route>
                            <Route
                                exact
                                path="/odai"
                                render={() => (
                                    <Redirect
                                        to={{ pathname: "/odai/recent" }}
                                    />
                                )}
                            />
                            <Route path="/odai">
                                <Odai />
                            </Route>
                            <UnAuthRoute exact path="/login">
                                <Login />
                            </UnAuthRoute>
                            <UnAuthRoute exact path="/login/:provider/callback">
                                <SocialLoginProgress />
                            </UnAuthRoute>
                            <UnAuthRoute exact path="/register">
                                <Register />
                            </UnAuthRoute>
                            <AuthRoute exact path="/explore">
                                <Explore />
                            </AuthRoute>
                            <AuthRoute exact path="/search/thread">
                                <SearchThread />
                            </AuthRoute>
                            <AuthRoute exact path="/notifications">
                                <Notifications />
                            </AuthRoute>
                            <AuthRoute exact path="/setting">
                                <Setting />
                            </AuthRoute>
                            <AuthRoute path="/user/:username">
                                <Account />
                            </AuthRoute>
                            <AuthRoute exact path="/thread/:threadId">
                                <Thread />
                            </AuthRoute>
                            <Route path="*">
                                <NotFound />
                            </Route>
                        </Switch>
                    </Box>
                    <SideBar />
                </Box>
            </Box>
            <SuccessSnackBar defOpen={Boolean(data)} message={data} />
        </Container>
    );
};

if (document.getElementById("app")) {
    const theme = createTheme(themeOptions);
    const root = ReactDOM.createRoot(
        document.getElementById("app") as HTMLElement
    );

    root.render(
        <Router>
            <QueryClientProvider client={client}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </Router>
    );
}
