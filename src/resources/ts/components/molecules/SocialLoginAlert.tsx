import { FC } from "react";
import { INTERNAL_SERVER_ERROR, UNKNOWN_STATUS } from "../../constants/statusCode";
import { Alert, AlertTitle } from "@mui/material";

type Props = {
    statusCode: number | undefined;
};

const SocialLoginAlert: FC<Props> = ({ statusCode }) => (
    <>
        {statusCode === INTERNAL_SERVER_ERROR || statusCode === UNKNOWN_STATUS && (
            <Alert severity="error" sx={{ mt: 2 }}>
                <AlertTitle>サーバエラー</AlertTitle>
                予期しないエラーが発生し、ソーシャルログインに失敗しました。恐れ入りますが時間をおいて再度お試しください。
            </Alert>
        )}
    </>
);

export default SocialLoginAlert;
