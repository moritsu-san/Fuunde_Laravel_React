import { Box, Button, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import CloudOffIcon from "@mui/icons-material/CloudOff";

const NotConnection = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            pt="120px"
            px="30px"
        >
            <Box mb="10px">
                <CloudOffIcon color="primary" fontSize="large" />
            </Box>
            <Box pb="20px">
                <Typography>インターネットに切断されていません。</Typography>
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

export default NotConnection;
