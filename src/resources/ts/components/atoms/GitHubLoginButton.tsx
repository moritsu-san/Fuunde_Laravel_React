import { FC } from "react";
import { Provider } from "../../models/OAuth";
import GitHubIcon from "@mui/icons-material/GitHub";
import { LoadingButton } from "@mui/lab";

type Props = {
    socialLoginIsLoading: boolean;
    handleSocialLoginRequest: (provider: Provider) => void;
};

const GitHubLoginButton: FC<Props> = ({
    socialLoginIsLoading,
    handleSocialLoginRequest,
}) => (
    <LoadingButton
        loading={socialLoginIsLoading}
        startIcon={<GitHubIcon />}
        loadingPosition="start"
        variant="contained"
        fullWidth
        sx={{
            color: "#fff",
            backgroundColor: "#24292e",
            textTransform: "none",
            "&:hover": {
                backgroundColor: "#24292e",
            },
        }}
        onClick={(e) => {
            e.preventDefault();
            handleSocialLoginRequest("github");
        }}
    >
        GitHubでログイン
    </LoadingButton>
);

export default GitHubLoginButton;
