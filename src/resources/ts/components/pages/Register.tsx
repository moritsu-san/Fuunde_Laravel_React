import { FC } from "react";
import Header from "../../containers/organisms/Header";
import {
    Avatar,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import GitHubLoginButton from "../atoms/GitHubLoginButton";
import { Link as RouterLink } from "react-router-dom";
import {
    FieldErrors,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormRegister,
} from "react-hook-form";
import { RegisterForm } from "../../models/RegisterForm";
import { Provider } from "../../models/OAuth";
import LoginAlert from "../molecules/LoginAlert";
import { INTERNAL_SERVER_ERROR } from "../../constants/statusCode";
import SocialLoginAlert from "../molecules/SocialLoginAlert";
import Copyright from "../atoms/Copyright";

type Props = {
    register: UseFormRegister<RegisterForm>;
    handleSubmit: UseFormHandleSubmit<RegisterForm, undefined>;
    isValid: boolean;
    errors: FieldErrors<RegisterForm>;
    handleRegister: SubmitHandler<RegisterForm>;
    statusCode?: number | undefined;
    socialLoginStatusCode?: number;
    isLoading: boolean;
    handleSocialLoginRequest: (provider: Provider) => void;
};

const Register: FC<Props> = ({
    register,
    handleSubmit,
    isValid,
    errors,
    handleRegister,
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
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        新規登録
                    </Typography>
                    {statusCode === INTERNAL_SERVER_ERROR && (
                        <LoginAlert statusCode={statusCode} />
                    )}
                    {socialLoginStatusCode && (
                        <SocialLoginAlert statusCode={socialLoginStatusCode} />
                    )}
                    <Box
                        component="form"
                        onSubmit={handleSubmit(handleRegister)}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            fullWidth
                            color={errors.name && "error"}
                            id="name"
                            label="名前"
                            autoComplete="name"
                            autoFocus
                            {...register("name")}
                        />
                        <Typography variant="subtitle2" color="error">
                            {errors.name?.message}
                        </Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            color={errors.email && "error"}
                            id="email"
                            label="メールアドレス"
                            autoComplete="email"
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
                        <TextField
                            margin="normal"
                            fullWidth
                            color={errors.password_confirmation && "error"}
                            label="パスワード(確認)"
                            type="password"
                            id="passwordConfirm"
                            autoComplete="current-password"
                            {...register("password_confirmation")}
                        />
                        <Typography variant="subtitle2" color="error">
                            {errors.password_confirmation?.message}
                        </Typography>
                        <Button
                            disabled={!isValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                        >
                            登録
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    variant="body2"
                                >
                                    アカウント作成済みの方
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

export default Register;
