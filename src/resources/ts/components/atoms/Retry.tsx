import { Box, Button, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

const Retry = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            pt="120px"
            px="30px"
        >
            <Box py="40px">
                <Typography>
                    問題が発生しました。再読み込みしてください。
                </Typography>
            </Box>
            <Box>
                <Button
                    variant="contained"
                    startIcon={<ReplayIcon sx={{ color: "white" }} />}
                    disableRipple
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    <Typography color="white">再読み込み</Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default Retry;
