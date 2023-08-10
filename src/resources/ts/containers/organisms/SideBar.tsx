import { Box } from "@mui/material";

const SideBar = () => {
    return (
        <Box
            id="sidebar"
            bgcolor="primary.main"
            sx={{
                display: { xs: "none", lg: "block" },
                width: { lg: "290px", xl: "350px" },
                mr: "10px",
            }}
        >
            <Box height="100%" minHeight="1200px" position="relative">
                <Box
                    position="sticky"
                    sx={{
                        width: { lg: "290px", xl: "350px" },
                    }}
                >
                    <Box display="block">
                        <Box display="flex">
                            <Box display="flex" pt="12px" pb="64px">
                                <Box
                                    position="fixed"
                                    top="0px"
                                    minHeight="32px"
                                    zIndex="2"
                                    mb="12px"
                                    border={1}
                                    sx={{ width: { lg: "290px", xl: "350px" } }}
                                ></Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SideBar;
