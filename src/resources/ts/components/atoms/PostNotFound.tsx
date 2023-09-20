import { Box, Typography } from "@mui/material";

const PostNotFound = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            pt="120px"
            px="30px"
        >
            <Box py="40px">
                <Typography>投稿がまだありません。</Typography>
            </Box>
        </Box>
    );
};

export default PostNotFound;
