import {
    Alert,
    AlertTitle,
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Container,
    Typography,
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Header from "../../containers/organisms/Header";

type Props = {
    oAuthError: boolean;
    statusCode?: number;
};

const Content: FC<Props> = ({ oAuthError, statusCode }) => {
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

const SocialLoginProgress: FC<Props> = ({ oAuthError, statusCode }) => {
    return (
        <>
            <Header />
            <main>
                <Container maxWidth="xs">
                    <Card
                        sx={{ mt: 8, border: 1, borderColor: "primary.light" }}
                    >
                        <CardHeader
                            title={
                                oAuthError || statusCode
                                    ? "ソーシャルログイン処理失敗"
                                    : "ソーシャルログイン処理中"
                            }
                            sx={{ textAlign: "center", mt: 1 }}
                        />
                        <CardContent>
                            <Content
                                oAuthError={oAuthError}
                                statusCode={statusCode}
                            />
                        </CardContent>
                    </Card>
                </Container>
            </main>
        </>
    );
};

export default SocialLoginProgress;
