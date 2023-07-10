import {
    Alert,
    AlertTitle,
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Provider } from "../../models/OAuth";
import useSocialRegister from "../../hooks/auth/useSocialRegister";

const registerSchema = z.object({
    name: z
        .string()
        .min(1, { message: "入力してください。" })
        .max(15, { message: "15文字以下にしてください。" })
        .regex(/^([a-zA-Z0-9]{0,15})$/, {
            message: "半角英数字のみ使えます。",
        }),
});

type PostData = {
    name: string;
    nick_name: string;
    email: string;
    provider_user_id: string;
};

type Props = {
    oAuthError: boolean;
    statusCode?: number;
    openForm: boolean;
    provider: Provider;
    nick_name?: string;
    email?: string;
    provider_user_id?: string;
};

const Content: FC<Props> = ({
    oAuthError,
    statusCode,
    openForm,
    provider,
    nick_name,
    email,
    provider_user_id,
}) => {
    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm({
        mode: "onChange",
        criteriaMode: "all",
        resolver: zodResolver(registerSchema),
    });

    const { error, isLoading, mutate: socialRegister } = useSocialRegister();
    const resNameErrors = error?.response?.data?.errors?.name;

    const handleSocialLogin = (data: any, event?: any) => {
        event?.preventDefault();
        const postData = {
            name: data.name,
            nick_name: nick_name,
            email: email,
            provider_user_id: provider_user_id,
        };
        socialRegister(
            { provider, postData: postData as PostData },
            {
                onSuccess: () => {
                    history.replace("/");
                },
            }
        );
    };

    if (openForm) {
        return (
            <>
                <Box
                    component="form"
                    onSubmit={handleSubmit(handleSocialLogin)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        fullWidth
                        color={errors.name && "error"}
                        id="name"
                        label="@ユーザーネーム(一意)"
                        placeholder="@"
                        autoFocus
                        {...register("name")}
                    />
                    <Typography variant="subtitle2" color="error">
                        {errors.name?.message as string | undefined}
                    </Typography>
                    {resNameErrors && (
                        <Typography variant="subtitle2" color="error">
                            このユーザーネームはすでに存在します。
                        </Typography>
                    )}
                    <Button
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        登録
                    </Button>
                </Box>
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
    }
    if (oAuthError) {
        return (
            <>
                <Alert severity="error">
                    <AlertTitle>認可エラー</AlertTitle>
                    ソーシャルサービス側の認可処理でエラーが発生しました。恐れ入りますが時間をおいて再度お試しください。
                </Alert>
                <Box py={2} textAlign="center">
                    <Typography variant="caption">
                        <Link to="/login">ログイン画面</Link>
                        に戻る
                    </Typography>
                </Box>
            </>
        );
    }

    if (statusCode) {
        return (
            <>
                <Alert severity="error">
                    <AlertTitle>サーバーエラー</AlertTitle>
                    予期しないエラーが発生し、ソーシャルログインに失敗しました。恐れ入りますが時間をおいて再度お試しください。
                </Alert>
                <Box py={2} textAlign="center">
                    <Typography variant="caption" color="secondary.dark">
                        <Link to="/login">
                            <ArrowCircleLeftIcon fontSize="small" />
                            ログイン画面
                        </Link>
                        に戻る
                    </Typography>
                </Box>
            </>
        );
    }

    return (
        <Box textAlign="center">
            <CircularProgress color="secondary" />
        </Box>
    );
};

const SocialLoginProgress: FC<Props> = ({
    oAuthError,
    statusCode,
    openForm,
    provider,
    nick_name,
    email,
    provider_user_id,
}) => {
    return (
            <main>
                <Container maxWidth="xs">
                    <Card
                        sx={{ mt: 8, border: 1, borderColor: "primary.light" }}
                    >
                        <CardHeader
                            title={
                                oAuthError || statusCode === 500
                                    ? "ソーシャルログイン処理失敗"
                                    : "ソーシャルログイン処理中"
                            }
                            sx={{ textAlign: "center", mt: 1 }}
                        />
                        <CardContent>
                            <Content
                                oAuthError={oAuthError}
                                statusCode={statusCode}
                                openForm={openForm}
                                provider={provider}
                                nick_name={nick_name}
                                email={email}
                                provider_user_id={provider_user_id}
                            />
                        </CardContent>
                    </Card>
                </Container>
            </main>
    );
};

export default SocialLoginProgress;
