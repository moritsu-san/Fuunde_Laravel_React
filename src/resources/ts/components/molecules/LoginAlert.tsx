import { FC } from "react";
import { INTERNAL_SERVER_ERROR } from "../../constants/statusCode";
import { Alert, AlertTitle } from "@mui/material";

type Props = {
    statusCode: number | undefined;
    resEmailErrors?: Array<string>;
};

const LoginAlert: FC<Props> = ({ statusCode, resEmailErrors}) => (
    <>
        {statusCode === INTERNAL_SERVER_ERROR && (
            <Alert severity="error" sx={{ mt: 2 }}>
                <AlertTitle>サーバエラー</AlertTitle>
                予期しないエラーが発生しました。恐れ入りますが時間をおいて再度お試しください。
            </Alert>
        )}

        {resEmailErrors && (
            <Alert severity="error" sx={{ mt: 2 }}>
                <AlertTitle>認証エラー</AlertTitle>
                メールアドレスとパスワードが一致しませんでした。恐れ入りますが再度お試しください。
            </Alert>
        )}
    </>
);

export default LoginAlert;
