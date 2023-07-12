import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MicExternalOnIcon from "@mui/icons-material/MicExternalOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import LoginIcon from "@mui/icons-material/Login";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {
    Link,
    useHistory,
    useLocation,
    useParams,
    useRouteMatch,
} from "react-router-dom";
import { FC, useState } from "react";
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";

type Props = {
    userName?: string;
    userNickName?: string;
    handleLogout: VoidFunction;
};

const Header: FC<Props> = ({ userName, userNickName, handleLogout }) => {
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
        { name: "アカウント", to: `/${userName}` },
        { name: "設定", to: `/${userName}` },
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
            to: "/",
            defaultIcon: <SearchIcon sx={{ fontSize: 28 }} />,
            activeIcon: <SearchIcon sx={{ color: grey[900], fontSize: 28 }} />,
        },
        {
            name: "通知",
            to: "/",
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
            defaultIcon: <Diversity1OutlinedIcon sx={{ fontSize: 28 }} />,
            activeIcon: (
                <Diversity1Icon sx={{ color: grey[900], fontSize: 28 }} />
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
                            <ListItem>
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
                                <ListItem>
                                    <ListItemButton
                                        disableRipple
                                        component={Link}
                                        to={page.to}
                                    >
                                        <ListItemIcon sx={{ minWidth: "28px" }}>
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
                                </ListItem>
                            ))}
                        </List>

                        {/* 新規登録とログインのメニュー */}
                        <List>
                            {!userName &&
                                unAuthSettings.map((setting) => (
                                    <ListItem>
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
                                    </ListItem>
                                ))}
                            {/* Userアイコン */}
                            {userName && (
                                <Tooltip title="設定を開く">
                                    <ListItem>
                                        <ListItemButton
                                            onClick={handleOpenUserMenu}
                                            disableRipple
                                            color="inherit"
                                            sx={{ p: 0, display: "flex" }}
                                        >
                                            <ListItemIcon sx={{ ml: "6px" }}>
                                                <AccountCircleIcon
                                                    sx={{ fontSize: "46px" }}
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
                                                        {userNickName}
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        {`@${userName}`}
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
                            {!userName &&
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

                            {userName &&
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
                            {userName && (
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
        </Box>
    );
};

export default Header;
