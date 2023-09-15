import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link, useLocation } from "react-router-dom";
import { FC } from "react";
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from "@tanstack/react-query";
import { Data } from "../../models/Answer";

type Props = {
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<Data[], unknown>>;
};

const AnswerMainHeader: FC<Props> = ({ refetch }) => {
    const { pathname } = useLocation();

    const handleRecentClick = () => {
        if (pathname === "/answer/recent") {
            refetch();
        }
    };

    const handlePopularClick = () => {
        if (pathname === "/answer/popular") {
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
            sx={{ backdropFilter: "blur(8px)" }}
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
                            アンサー
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
                            to={"/answer/recent"}
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
                                        pathname === "/answer/recent"
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
                            to={"/answer/popular"}
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
                                        pathname === "/answer/popular"
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

export default AnswerMainHeader;
