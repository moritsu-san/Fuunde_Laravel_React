import { Avatar, Box, IconButton, Skeleton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { DataAnswers } from "../../models/Thread";
import { cardAvatar } from "../../hooks/libs/cardAvatar";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

type Props = {
    data: DataAnswers;
};

const TopAnswerCard: FC<Props> = ({ data }) => {
    const user = data.user;

    return (
        <Box width={1} sx={{ borderBottom: 1, borderColor: grey[300] }}>
            <Box
                component="article"
                width={1}
                pb="4px"
                px={2}
                sx={{ cursor: "pointer" }}
            >
                <Box display="flex">
                    {data ? (
                        <>
                            <Box
                                mr="12px"
                                display="flex"
                                flexDirection="column"
                            >
                                <Box component={Link} to={`/${user.username}`}>
                                    <Avatar {...cardAvatar(user.name)} />
                                </Box>
                            </Box>
                            <Box pb="8px" width={1}>
                                <Box mb="2px">
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="baseline"
                                        >
                                            <Box>
                                                <Box
                                                    component={Link}
                                                    to={`/${user.username}`}
                                                >
                                                    <Typography
                                                        fontSize="15px"
                                                        fontWeight="bold"
                                                    >
                                                        {user.name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box ml="4px">
                                                <Box
                                                    component={Link}
                                                    to={`/${data.user.username}`}
                                                >
                                                    <Typography
                                                        fontSize="15px"
                                                        sx={{
                                                            color: grey[600],
                                                        }}
                                                    >
                                                        @{data.user.username}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box
                                                component="span"
                                                fontSize="15px"
                                                fontWeight="bold"
                                                color={grey[600]}
                                                px="4px"
                                            >
                                                ·
                                            </Box>
                                            <Box>
                                                <Box
                                                    component={Link}
                                                    to={`/${data.user.username}`}
                                                >
                                                    <Box
                                                        component="time"
                                                        dateTime={
                                                            data.created_at
                                                        }
                                                        sx={{
                                                            color: grey[600],
                                                            fontSize: "15px",
                                                        }}
                                                    >
                                                        {data.diff_for_humans}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <MoreHorizIcon
                                                sx={{ color: grey[500] }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box pt="14px" pb={1}>
                                    <Typography
                                        variant="h6"
                                        textAlign="center"
                                        fontWeight="bold"
                                    >
                                        {data.body}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="end">
                                    <Box mr="50px">
                                        <IconButton sx={{ p: 0 }}>
                                            <FavoriteBorderIcon
                                                sx={{ width: "1.25rem" }}
                                            />
                                        </IconButton>
                                    </Box>
                                    <Box mr="20px">
                                        <IconButton sx={{ p: 0 }}>
                                            <BookmarkBorderIcon
                                                sx={{ width: "1.25rem" }}
                                            />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <Skeleton variant="rectangular" />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default TopAnswerCard;
