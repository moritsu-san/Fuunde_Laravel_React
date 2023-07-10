import { Box, CircularProgress, Container } from "@mui/material";

const Loading = () => (
    <Container maxWidth="xs">
        <Box
            width={1}
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop="-18px"
        >
            <CircularProgress />
        </Box>
    </Container>
);

export default Loading;
