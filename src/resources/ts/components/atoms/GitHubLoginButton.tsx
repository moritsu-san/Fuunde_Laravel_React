import { FC } from "react";
import { Provider } from "../../models/OAuth";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

type Props = {
    handleSocialLoginRequest: (provider: Provider) => void;
};

const GitHubLoginButton: FC<Props> = ({ handleSocialLoginRequest }) => (
    <Button
        variant="contained"
        startIcon={<GitHubIcon />}
        fullWidth
        sx={{
            color: "#fff",
            backgroundColor: "#24292e",
            textTransform: "none",
            '&:hover': {
                backgroundColor: '#24292e'
            }
        }}
        onClick={(e) => {
            e.preventDefault();
            handleSocialLoginRequest("github");
        }}
    >
        GitHubでログイン
    </Button>
);

export default GitHubLoginButton;
