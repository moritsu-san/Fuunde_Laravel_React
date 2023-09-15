import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
    username?: string;
};

const AccountNotFound: FC<Props> = ({ username }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            pt="120px"
        >
            <Box
                pt="40px"
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography fontSize="25px" fontWeight="bold">
                    @{username}
                </Typography>
                <Typography>は存在しません。</Typography>
            </Box>
            <Box pb="20px">
                <Typography>他のアカウントを検索してください。</Typography>
            </Box>
            <Box>
                <Box component={Link} to="/explore">
                    <Button variant="contained" disableRipple>
                        <Typography color="white">検索する</Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AccountNotFound;
