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
import {
    QueryClient,
    QueryClientProvider,
    useQueryClient,
} from "@tanstack/react-query";

import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:3000/";

import Login from "./containers/pages/Login";
import NotFound from "./containers/pages/NotFound";
import Answer from "./containers/pages/Answer";
import Register from "./containers/pages/Register";

import useCurrentUser from "./hooks/user/useCurrentUser";
import useGetUserQuery from "./hooks/user/useGetUserQuery";
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
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: "/login", state: { from: location } }}
                    />
                )
            }
        />
    );
};

const App = () => {
    const queryClient = useQueryClient();
    const { isLoading } = useGetUserQuery({
        retry: 0,
        initialData: undefined,
        onError: () => {
            queryClient.setQueryData(["user"], null);
        },
    });

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
                            m: 0,
                            borderLeft: 1,
                            borderRight: 1,
                            zIndex: 1,
                            flexGrow: 1,
                        }}
                    >
                        <Switch>
                            <Route exact path={["/", "/answer"]}>
                                <Answer />
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
                            <AuthRoute path="/:userName">
                                <Account />
                            </AuthRoute>
                            <AuthRoute path="*">
                                <NotFound />
                            </AuthRoute>
                        </Switch>
                    </Box>

                    <SideBar />
                </Box>
            </Box>
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
            </QueryClientProvider>
        </Router>
    );
}
