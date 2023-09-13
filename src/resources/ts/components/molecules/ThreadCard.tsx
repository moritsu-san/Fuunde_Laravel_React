import { FC } from "react";
import useCurrentUser from "../../hooks/user/useCurrentUser";
import { Data } from "../../models/Thread";
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { cardAvatar } from "../../hooks/libs/cardAvatar";
import { grey } from "@mui/material/colors";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PostAnswerButton from "./PostAnswerButton";
import LikeButton from "../atoms/LikeButton";

type Props = {
    thread: Data;
};

const ThreadCard: FC<Props> = ({ thread }) => {
    const user = useCurrentUser();
    const defIsLiked =
        thread?.likes?.find((i) => i.username === user?.username) === undefined
            ? false
            : true;

    return (
        <Box width={1} borderBottom={1} borderColor={grey[300]}>
            <Box
                component="article"
                width={1}
                py={1}
                pb="4px"
                px={2}
                sx={{ cursor: "pointer" }}
            >
                <Box display="flex">
                    <>
                        <Box mr="12px" display="flex" flexDirection="column">
                            <Box
                                component={Link}
                                to={`/user/${thread.user.username}`}
                            >
                                <Avatar {...cardAvatar(thread.user.name)} />
                            </Box>
                        </Box>
                        <Box pb="8px" width={1}>
                            <Box mb="2px">
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <Box display="flex" alignItems="baseline">
                                        <Box>
                                            <Box
                                                component={Link}
                                                to={`/user/${thread.user.username}`}
                                            >
                                                <Typography
                                                    fontSize="15px"
                                                    fontWeight="bold"
                                                >
                                                    {thread.user.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box ml="4px">
                                            <Box
                                                component={Link}
                                                to={`/user/${thread.user.username}`}
                                            >
                                                <Typography
                                                    fontSize="15px"
                                                    sx={{
                                                        color: grey[600],
                                                    }}
                                                >
                                                    @{thread.user.username}
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
                                                to={`/user/${thread.user.username}`}
                                            >
                                                <Box
                                                    component="time"
                                                    dateTime={thread.created_at}
                                                    sx={{
                                                        color: grey[600],
                                                        fontSize: "15px",
                                                    }}
                                                >
                                                    {thread.diff_for_humans}
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
                            <Box
                                pt="14px"
                                pb={1}
                                component={Link}
                                to={`/thread/${thread.id}`}
                            >
                                <Typography
                                    variant="h6"
                                    textAlign="center"
                                    fontWeight="bold"
                                >
                                    {thread.body}
                                </Typography>
                            </Box>
                            <Box display="flex">
                                <Box mr="auto">
                                    {user ? (
                                        <PostAnswerButton
                                            data={thread}
                                            toThreadPage={false}
                                        />
                                    ) : (
                                        <Tooltip
                                            title="ログインしてください"
                                            placement="top"
                                            arrow
                                        >
                                            <IconButton sx={{ p: 0 }}>
                                                <ChatBubbleOutlineIcon
                                                    sx={{
                                                        width: "1.25rem",
                                                    }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>
                                <Box mr="50px">
                                    <LikeButton
                                        mode="thread"
                                        id={thread.id}
                                        defIsLiked={defIsLiked}
                                        defLikesCount={thread.likes_count}
                                    />
                                </Box>
                                <Box mr="20px">
                                    <Tooltip
                                        title="ログインしてください"
                                        placement="top"
                                        arrow
                                    >
                                        <IconButton sx={{ p: 0 }}>
                                            <BookmarkBorderIcon
                                                sx={{
                                                    width: "1.25rem",
                                                }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Box>
                    </>
                </Box>
            </Box>
        </Box>
    );
};

export default ThreadCard;
