import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MicExternalOnIcon from "@mui/icons-material/MicExternalOn";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LoginIcon from "@mui/icons-material/Login";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation } from "react-router-dom";
import { FC, useState } from "react";
import {
    Avatar,
    Backdrop,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { cardAvatar } from "../../hooks/libs/cardAvatar";
import PostThreadButton from "../molecules/PostThreadButton";

type Props = {
    username?: string;
    name?: string;
    handleLogout: VoidFunction;
    logoutIsLoading: boolean;
};

const Header: FC<Props> = ({
    username,
    name,
    handleLogout,
    logoutIsLoading,
}) => {
    const { pathname } = useLocation();
    const firstPath = "/" + pathname.split("/")[1];

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const authSettings = [
        { name: "アカウント", to: `/user/${username}` },
        { name: "設定", to: "/setting" },
    ];

    const pages = [
        {
            name: "アンサー",
            to: "/answer",
            defaultIcon: (
                <ChatBubbleOutlineIcon sx={{ fontSize: 28, mb: "-6px" }} />
            ),
            activeIcon: (
                <ChatBubbleIcon
                    sx={{ color: grey[900], fontSize: 28, mb: "-6px" }}
                />
            ),
        },
        {
            name: "お題",
            to: "/odai",
            defaultIcon: <ArticleOutlinedIcon sx={{ fontSize: 28 }} />,
            activeIcon: <ArticleIcon sx={{ color: grey[900], fontSize: 28 }} />,
        },
        {
            name: "MC",
            to: "/MC",
            defaultIcon: <PeopleAltOutlinedIcon sx={{ fontSize: 28 }} />,
            activeIcon: (
                <PeopleAltIcon sx={{ color: grey[900], fontSize: 28 }} />
            ),
        },
        {
            name: "検索",
            to: "/explore",
            defaultIcon: <SearchIcon sx={{ fontSize: 28 }} />,
            activeIcon: <SearchIcon sx={{ color: grey[900], fontSize: 28 }} />,
        },
        {
            name: "通知",
            to: "/notifications",
            defaultIcon: <NotificationsOutlinedIcon sx={{ fontSize: 28 }} />,
            activeIcon: (
                <NotificationsIcon sx={{ color: grey[900], fontSize: 28 }} />
            ),
        },
    ];

    const unAuthSettings = [
        {
            name: "新規登録",
            to: "/register",
            defaultIcon: (
                <GroupAddOutlinedIcon sx={{ fontSize: 28, ml: "4px" }} />
            ),
            activeIcon: (
                <GroupAddIcon
                    sx={{ color: grey[900], fontSize: 28, ml: "4px" }}
                />
            ),
        },
        {
            name: "ログイン",
            to: "/login",
            defaultIcon: <LoginIcon sx={{ fontSize: 28 }} />,
            activeIcon: <LoginIcon sx={{ color: grey[900], fontSize: 28 }} />,
        },
    ];

    return (
        <Box
            component="header"
            sx={{
                position: "relative",
                height: "100vh",
                px: "4px",
                zIndex: "3",
                flexGrow: "1",
            }}
        >
            <Box
                sx={{
                    width: { xs: "68px", sm: "88px", xl: "275px" },
                    mr: { xs: "8px", xl: "0" },
                }}
            >
                <Box height="100%" position="fixed" top="0px">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "100%",
                            ml: { xl: "60px" },
                        }}
                    >
                        <List>
                            {/* ロゴ */}
                            <ListItem key="ロゴ">
                                <ListItemButton
                                    disableRipple
                                    component={Link}
                                    to="/"
                                >
                                    <ListItemIcon sx={{ minWidth: "28px" }}>
                                        <MicExternalOnIcon
                                            color="primary"
                                            sx={{ fontSize: 28 }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="FunnDe"
                                        primaryTypographyProps={{
                                            display: {
                                                xs: "none",
                                                xl: "inline",
                                            },
                                            fontSize: "18px",
                                            color: "primary",
                                        }}
                                        sx={{ ml: "12px", mr: "8px" }}
                                    ></ListItemText>
                                </ListItemButton>
                            </ListItem>

                            {/* Navメニュー */}
                            {pages.map((page) => (
                                <ListItem key={page.name}>
                                    <Tooltip
                                        title={page.name}
                                        placement="bottom"
                                        arrow
                                        PopperProps={{
                                            sx: {
                                                display: { xl: "none" },
                                                mt: "-14px !important",
                                                ml: "-12px !important",
                                            },
                                        }}
                                    >
                                        <ListItemButton
                                            disableRipple
                                            component={Link}
                                            to={page.to}
                                        >
                                            <ListItemIcon
                                                sx={{ minWidth: "28px" }}
                                            >
                                                {firstPath === page.to
                                                    ? page.activeIcon
                                                    : page.defaultIcon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={page.name}
                                                primaryTypographyProps={
                                                    firstPath === page.to
                                                        ? {
                                                              display: {
                                                                  xs: "none",
                                                                  xl: "inline",
                                                              },
                                                              fontSize: "18px",
                                                              fontWeight: 600,
                                                          }
                                                        : {
                                                              display: {
                                                                  xs: "none",
                                                                  xl: "inline",
                                                              },
                                                              fontSize: "18px",
                                                          }
                                                }
                                                sx={{ ml: "12px", mr: "8px" }}
                                            />
                                        </ListItemButton>
                                    </Tooltip>
                                </ListItem>
                            ))}
                            {username && (
                                <ListItem>
                                    <Box width="90%" my="12px">
                                        <PostThreadButton />
                                    </Box>
                                </ListItem>
                            )}
                        </List>

                        {/* 新規登録とログインのメニュー */}
                        <List>
                            {!username &&
                                unAuthSettings.map((setting) => (
                                    <ListItem key={setting.name}>
                                        <Tooltip
                                            title={setting.name}
                                            placement="top"
                                            arrow
                                            PopperProps={{
                                                sx: {
                                                    display: { xl: "none" },
                                                    mb: "-14px !important",
                                                    ml: "-12px !important",
                                                },
                                            }}
                                        >
                                            <ListItemButton
                                                disableRipple
                                                component={Link}
                                                to={setting.to}
                                            >
                                                <ListItemIcon
                                                    sx={{ minWidth: "28px" }}
                                                >
                                                    {firstPath === setting.to
                                                        ? setting.activeIcon
                                                        : setting.defaultIcon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={setting.name}
                                                    primaryTypographyProps={
                                                        firstPath === setting.to
                                                            ? {
                                                                  display: {
                                                                      xs: "none",
                                                                      xl: "inline",
                                                                  },
                                                                  fontSize:
                                                                      "18px",
                                                                  fontWeight: 600,
                                                              }
                                                            : {
                                                                  display: {
                                                                      xs: "none",
                                                                      xl: "inline",
                                                                  },
                                                                  fontSize:
                                                                      "18px",
                                                              }
                                                    }
                                                    sx={{
                                                        ml: "12px",
                                                        mr: "8px",
                                                    }}
                                                />
                                            </ListItemButton>
                                        </Tooltip>
                                    </ListItem>
                                ))}
                            {/* Userアイコン */}
                            {username && (
                                <Tooltip
                                    title="設定を開く"
                                    placement="top"
                                    arrow
                                    PopperProps={{
                                        sx: {
                                            ml: "-14px !important",
                                        },
                                    }}
                                >
                                    <ListItem key="ユーザー">
                                        <ListItemButton
                                            onClick={handleOpenUserMenu}
                                            disableRipple
                                            color="inherit"
                                            sx={{ p: 0, display: "flex" }}
                                        >
                                            <ListItemIcon sx={{ ml: "6px" }}>
                                                <Avatar
                                                    {...cardAvatar(
                                                        name as string
                                                    )}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                sx={{
                                                    display: {
                                                        xs: "none",
                                                        xl: "block",
                                                    },
                                                    ml: "-4px",
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            mb: "-1px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {name}
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        {`@${username}`}
                                                    </Typography>
                                                </Box>
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                </Tooltip>
                            )}
                        </List>

                        {/* Userアイコンのドロップダウン */}
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {!username &&
                                unAuthSettings.map((setting) => (
                                    <MenuItem
                                        key={setting.name}
                                        onClick={handleCloseUserMenu}
                                        component={Link}
                                        to={setting.to}
                                    >
                                        <Typography textAlign="center">
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                ))}

                            {username &&
                                authSettings.map((setting) => (
                                    <MenuItem
                                        key={setting.name}
                                        onClick={handleCloseUserMenu}
                                        component={Link}
                                        to={setting.to}
                                    >
                                        <Typography textAlign="center">
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            {username && (
                                <MenuItem
                                    key={"ログアウト"}
                                    onClick={handleLogout}
                                >
                                    <Typography textAlign="center">
                                        ログアウト
                                    </Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Box>
            </Box>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={logoutIsLoading}
            ></Backdrop>
        </Box>
    );
};

export default Header;
