import { Box, List, ListItem, ListItemButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
    username: string;
};

const AccountInfoHeader: FC<Props> = ({ username }) => {
    const { pathname } = useLocation();
    return (
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
                        to={`/user/${username}`}
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
                                display={
                                    pathname === `/user/${username}`
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
                        component={Link}
                        to={`/user/${username}/odai`}
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
                                display={
                                    pathname === `/user/${username}/odai`
                                        ? "inline-flex"
                                        : "none"
                                }
                                bottom="0px"
                                right="-5px"
                                width="calc(100% + 8px)"
                                height="4px"
                                bgcolor="primary.main"
                            ></Box>
                        </Box>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
};

export default AccountInfoHeader;
