import { Box, IconButton, List, ListItem, ListItemButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Link, useHistory } from "react-router-dom";
import { FC } from "react";
import SearchBox from "../atoms/SearchBox";

type Props = {
    keyword?: string;
    isAnswer?: boolean;
};

const SearchMainHeader: FC<Props> = ({ keyword, isAnswer }) => {
    const history = useHistory();

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
                    width={1}
                    height="53px"
                    px={1}
                    pt="16px"
                    sx={{ maxWidth: { sm: "600px" } }}
                >
                    <Box minWidth="56px">
                        <IconButton
                            disableRipple
                            onClick={() => {
                                history.goBack();
                            }}
                            sx={{ p: 0 }}
                        >
                            <ArrowBackOutlinedIcon color="primary" />
                        </IconButton>
                    </Box>
                    <Box flexGrow={1}>
                        <SearchBox defKeyword={keyword} isAnswer={isAnswer} />
                    </Box>
                    <Box minWidth="56px"></Box>
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
                            component={Link}
                            to={`/search/thread?keyword=${keyword}`}
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
                                <Box component="span">お題</Box>
                                <Box
                                    position="absolute"
                                    display={!isAnswer ? "inline-flex" : "none"}
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
                            component={Link}
                            to={`/search/thread?keyword=${keyword}&mode=answer`}
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
                                <Box component="span">アンサー</Box>
                                <Box
                                    position="absolute"
                                    display={isAnswer ? "inline-flex" : "none"}
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

export default SearchMainHeader;
