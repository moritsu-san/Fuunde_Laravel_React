import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
    username?: string;
};

const AccountPageNotFound: FC<Props> = ({ username }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            pt="40px"
        >
            <Box pt="40px">
                <Typography>このページは存在しません。</Typography>
            </Box>
            <Box
                pb="20px"
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <Typography fontWeight="bold">@{username}</Typography>
                <Typography>のホームに戻ってください。</Typography>
            </Box>
            <Box>
                <Box component={Link} to={`/user/${username}`}>
                    <Button variant="contained" disableRipple>
                        <Typography color="white">戻る</Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AccountPageNotFound;
