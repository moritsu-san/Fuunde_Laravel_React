import { Box, CircularProgress, Container } from "@mui/material";
import  Header from "../../containers/organisms/Header";

const Loading = () => (
    <>
        <Header />
        <Container maxWidth="xs">
            <Box
                width={1}
                height="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <CircularProgress color="secondary" />
            </Box>
        </Container>
    </>
);

export default Loading;
