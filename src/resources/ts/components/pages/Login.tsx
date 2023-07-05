import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../atoms/Copyright";
import LoginAlert from "../molecules/LoginAlert";
import { INTERNAL_SERVER_ERROR } from "../../constants/statusCode";
import { Backdrop, CircularProgress, Divider } from "@mui/material";
import {
    FieldErrors,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormRegister,
} from "react-hook-form";
import { LoginForm } from "../../models/LoginForm";
import { Provider } from "../../models/OAuth";
import GitHubLoginButton from "../atoms/GitHubLoginButton";
import Header from "../../containers/organisms/Header";
import SocialLoginAlert from "../molecules/SocialLoginAlert";

type Props = {
    register: UseFormRegister<LoginForm>;
    handleSubmit: UseFormHandleSubmit<LoginForm, undefined>;
    isValid: boolean;
    errors: FieldErrors<LoginForm>;
    resEmailErrors?: Array<string>;
    handleLogin: SubmitHandler<LoginForm>;
    statusCode?: number | undefined;
    socialLoginStatusCode?: number;
    isLoading: boolean;
    handleSocialLoginRequest: (provider: Provider) => void;
};

const Login: FC<Props> = ({
    register,
    handleSubmit,
    isValid,
    errors,
    resEmailErrors,
    handleLogin,
    statusCode,
    socialLoginStatusCode,
    isLoading,
    handleSocialLoginRequest,
}) => {
    return (
        <>
            <Header />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ログイン
                    </Typography>
                    {statusCode === INTERNAL_SERVER_ERROR ||
                        (resEmailErrors && (
                            <LoginAlert
                                statusCode={statusCode}
                                resEmailErrors={resEmailErrors}
                            />
                        ))}
                    {socialLoginStatusCode && (
                        <SocialLoginAlert statusCode={socialLoginStatusCode} />
                    )}
                    <Box
                        component="form"
                        onSubmit={handleSubmit(handleLogin)}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            fullWidth
                            color={errors.email && "error"}
                            id="email"
                            label="メールアドレス"
                            autoComplete="email"
                            autoFocus
                            {...register("email")}
                        />
                        <Typography variant="subtitle2" color="error">
                            {errors.email?.message}
                        </Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            color={errors.password && "error"}
                            label="パスワード"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register("password")}
                        />
                        <Typography variant="subtitle2" color="error">
                            {errors.password?.message}
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    disabled
                                    value="remember"
                                    color="secondary"
                                />
                            }
                            label="ログイン状態を保持する"
                        />
                        <Button
                            disabled={!isValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                        >
                            ログイン
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    component={RouterLink}
                                    to="/"
                                    variant="body2"
                                >
                                    パスワードを忘れた方
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/register"
                                    variant="body2"
                                >
                                    {"アカウントを作成"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Divider sx={{ mt: 2 }} />
                        <Box sx={{ width: 1, mt: 2 }}>
                            <GitHubLoginButton
                                handleSocialLoginRequest={
                                    handleSocialLoginRequest
                                }
                            />
                        </Box>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
        </>
    );
};

export default Login;
