import { Box, IconButton, List, ListItem, ListItemButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Link, useHistory } from "react-router-dom";
import { FC } from "react";
import SearchBox from "../atoms/SearchBox";

type Props = {
    keyword?: string;
};

const SearchMainHeader: FC<Props> = ({ keyword }) => {
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
                    width="100%"
                    height="53px"
                    px="4px"
                    pt="4px"
                    sx={{ maxWidth: { sm: "600px" } }}
                >
                    <Box position="absolute" left="0">
                        <IconButton
                            disableRipple
                            onClick={() => {
                                history.goBack();
                            }}
                        >
                            <ArrowBackOutlinedIcon color="primary" />
                        </IconButton>
                    </Box>
                    <Box display="flex" alignItems="flex-start">
                        <SearchBox defKeyword={keyword} />
                    </Box>
                    <Box></Box>
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
                                <Box component="span">お題</Box>
                            </Box>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="2">
                        <ListItemButton
                            disableRipple
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
                                <Box component="span">アンサー</Box>
                            </Box>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default SearchMainHeader;
