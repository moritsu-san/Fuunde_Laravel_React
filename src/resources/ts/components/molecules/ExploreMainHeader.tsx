import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import SearchBox from "../atoms/SearchBox";

const ExploreMainHeader = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            position="sticky"
            top="-0.5px"
            bgcolor="rgba(255, 255, 255, 0.85)"
            zIndex="3"
            sx={{ backdropFilter: "blur(8px)" }}
        >
            <Box zIndex="2">
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    px="16px"
                    pt="16px"
                    pb="26px"
                    sx={{ maxWidth: { sm: "600px" } }}
                    borderBottom={1}
                    borderColor={grey[300]}
                >
                    <Box display="flex" alignItems="flex-start">
                        <SearchBox />
                    </Box>
                    <Box></Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ExploreMainHeader;
