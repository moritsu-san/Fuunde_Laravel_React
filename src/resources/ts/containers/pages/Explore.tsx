import { Box } from "@mui/material";
import SearchMainHeader from "../../components/molecules/SearchMainHeader";

const Explore = () => {
    return (
        <Box display="flex" flexDirection="column">
            <SearchMainHeader />
            <Box>検索してください</Box>
        </Box>
    );
};

export default Explore;
