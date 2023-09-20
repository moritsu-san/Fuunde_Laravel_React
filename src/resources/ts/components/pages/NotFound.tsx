import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
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
                    このページは存在しません。URLを間違えてないか確認してください。
                </Typography>
            </Box>
            <Box>
                <Box component={Link} to="/answer/recent">
                    <Button variant="contained" disableRipple>
                        <Typography color="white">ホームへ戻る</Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default NotFound;
