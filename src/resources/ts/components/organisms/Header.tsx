import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MicIcon from "@mui/icons-material/Mic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import WidthNormalOutlinedIcon from "@mui/icons-material/WidthNormalOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { FC, useState } from "react";
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

type Props = {
    userName?: string;
    userNickName?: string;
    handleLogout: VoidFunction;
};

const Header: FC<Props> = ({ userName, userNickName, handleLogout }) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
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
            name: "Answer",
            to: "/answer",
            icon: <ChatBubbleOutlineIcon sx={{ fontSize: "32px" }} />,
        },
        {
            name: "Odai",
            to: "/odai",
            icon: <WidthNormalOutlinedIcon sx={{ fontSize: "32px" }} />,
        },
        {
            name: "MC",
            to: "/MC",
            icon: <PeopleOutlineIcon sx={{ fontSize: "32px" }} />,
        },
        {
            name: "Explore",
            to: "/",
            icon: <SearchIcon sx={{ fontSize: "32px" }} />,
        },
        {
            name: "Notifications",
            to: "/",
            icon: <NotificationsNoneIcon sx={{ fontSize: "32px" }} />,
        },
    ];

    const unAuthSettings = [
        { name: "新規登録", to: "/register" },
        { name: "ログイン", to: "/login" },
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
                    <List sx={{ height: "100%", fontSize: "20px" }}>
                        <ListItem>
                            <Button variant="contained" component={Link} to="/">
                                <ListItemIcon sx={{ minWidth: "36px" }}>
                                    <MicIcon sx={{ fontSize: "36px" }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="FunnDe"
                                    primaryTypographyProps={{
                                        display: {
                                            xs: "none",
                                            xl: "inline",
                                        },
                                        fontSize: "20px",
                                    }}
                                    sx={{ ml: "16px", mr: "8px" }}
                                ></ListItemText>
                            </Button>
                        </ListItem>
                        {pages.map((page) => (
                            <ListItem>
                                <ListItemButton component={Link} to={page.to}>
                                    <ListItemIcon sx={{ minWidth: "32px" }}>
                                        {page.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={page.name}
                                        primaryTypographyProps={{
                                            display: {
                                                xs: "none",
                                                xl: "inline",
                                            },
                                            fontSize: "18px",
                                        }}
                                        sx={{ ml: "16px", mr: "8px" }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}

                        {/* <Box
                    sx={{
                        flexGrow: 1,
                        display: { xs: "flex", md: "none" },
                    }}
                >
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        disableRipple
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: "block", md: "none" },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                component={Link}
                                to={page.to}
                            >
                                <Typography textAlign="center">
                                    {page.name}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box> */}
                        {/* <MicIcon
                    sx={{ display: { xs: "flex", md: "none" }, mr: 0.5 }}
                />
                <Typography
                    variant="h5"
                    noWrap
                    component={Link}
                    to="/"
                    sx={{
                        mr: 2,
                        display: { xs: "flex", md: "none" },
                        flexGrow: 1,
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    FunnDe
                </Typography> */}
                        {/* <Box
                    sx={{
                        flexGrow: 1,
                        display: { xs: "none", md: "flex" },
                    }}
                >
                    {pages.map((page) => (
                        <Button
                            key={page.name}
                            component={Link}
                            to={page.to}
                            sx={{
                                my: 2,
                                color: "text.primary",
                                display: "block",
                                textAlign: "center",
                            }}
                        >
                            {page.name}
                        </Button>
                    ))}
                </Box> */}

                        <Box sx={{ position: "absolute", bottom: "8px" }}>
                            <Tooltip title="設定を開く">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0, display: "block" }}
                                    disableRipple
                                    color="inherit"
                                >
                                    <AccountCircleIcon
                                        sx={{ fontSize: "2.4rem" }}
                                    />
                                </IconButton>
                            </Tooltip>
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
                                {userName && (
                                    <div>
                                        <Box sx={{ display: "flex", p: 1.5 }}>
                                            <AccountCircleIcon
                                                sx={{
                                                    fontSize: "2rem",
                                                    mr: 0.5,
                                                }}
                                            />
                                            <Box>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        mb: "-0.5rem",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {userNickName}
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    {`@${userName}`}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Divider />
                                    </div>
                                )}
                                {!userName &&
                                    unAuthSettings.map((setting) => (
                                        <MenuItem
                                            key={setting.name}
                                            onClick={handleCloseNavMenu}
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
                                            onClick={handleCloseNavMenu}
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
                    </List>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
