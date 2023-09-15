import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { Data } from "../../models/Thread";
import { FC } from "react";

type Props = {
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<Data[], unknown>>;
};

const OdaiMainHeader: FC<Props> = ({ refetch }) => {
    const { pathname } = useLocation();

    const handleRecentClick = () => {
        if (pathname === "/odai/recent") {
            refetch();
        }
    };

    const handlePopularClick = () => {
        if (pathname === "/odai/popular") {
            refetch();
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            position="sticky"
            top="-0.5px"
            bgcolor="rgba(255, 255, 255, 0.85)"
            zIndex="3"
            sx={{ backdropFilter: "blur(8px)", cursor: "pointer" }}
        >
            <Box zIndex="2">
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    width="100%"
                    height="53px"
                    px="16px"
                    sx={{ maxWidth: { sm: "600px" } }}
                >
                    <Box display="flex" alignItems="flex-start">
                        <Typography
                            component="h2"
                            sx={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                            お題
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box component="nav" borderBottom={1} borderColor={grey[300]}>
                <List
                    sx={{
                        height: "53px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <ListItem key="1">
                        <ListItemButton
                            disableRipple
                            onClick={handleRecentClick}
                            component={Link}
                            to={"/odai/recent"}
                            sx={{
                                display: "flex",
                                justifyContent: "center",

                                px: "16px",
                            }}
                        >
                            <Box
                                display="flex"
                                position="relative"
                                justifyContent="center"
                                py="16px"
                                fontSize="15px"
                                fontWeight="bold"
                            >
                                <Box component="span">新着順</Box>
                                <Box
                                    position="absolute"
                                    display={
                                        pathname === "/odai/recent"
                                            ? "inline-flex"
                                            : "none"
                                    }
                                    bottom="0px"
                                    width="calc(100% + 8px)"
                                    height="4px"
                                    bgcolor="primary.main"
                                ></Box>
                            </Box>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="2">
                        <ListItemButton
                            disableRipple
                            onClick={handlePopularClick}
                            component={Link}
                            to={"/odai/popular"}
                            sx={{
                                display: "flex",
                                justifyContent: "center",

                                px: "16px",
                            }}
                        >
                            <Box
                                display="flex"
                                position="relative"
                                justifyContent="center"
                                py="16px"
                                fontSize="15px"
                                fontWeight="bold"
                            >
                                <Box component="span">人気順</Box>
                                <Box
                                    position="absolute"
                                    display={
                                        pathname === "/odai/popular"
                                            ? "inline-flex"
                                            : "none"
                                    }
                                    bottom="0px"
                                    width="calc(100% + 8px)"
                                    height="4px"
                                    bgcolor="primary.main"
                                ></Box>
                            </Box>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default OdaiMainHeader;
