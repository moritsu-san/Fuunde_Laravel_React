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
import { format } from "date-fns";

type Props = {
    thread: Data;
};

const ThreadOdaiCard: FC<Props> = ({ thread }) => {
    const user = useCurrentUser();
    const defIsLiked =
        thread?.likes?.find((i) => i.username === user?.username) === undefined
            ? false
            : true;

    return (
        <Box width={1}>
            <Box
                component="article"
                width={1}
                py={1}
                pb="4px"
                px={2}
                sx={{ cursor: "pointer" }}
            >
                <Box display="flex" flexDirection="column">
                    <>
                        <Box
                            display="flex"
                            flexDirection="row"
                            my="8px"
                            width={1}
                        >
                            <Box mr="12px">
                                <Box
                                    component={Link}
                                    to={`/user/${thread.user.username}`}
                                >
                                    <Avatar {...cardAvatar(thread.user.name)} />
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="row"
                                justifyContent="space-between"
                                width={1}
                            >
                                <Box display="flex" flexDirection="column">
                                    <Box>
                                        <Box
                                            component={Link}
                                            to={`/user/${thread.user.username}`}
                                        >
                                            <Typography
                                                fontSize="15px"
                                                fontWeight="bold"
                                                lineHeight="20px"
                                            >
                                                {thread.user.name}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Box
                                            component={Link}
                                            to={`/user/${thread.user.username}`}
                                        >
                                            <Typography
                                                fontSize="15px"
                                                lineHeight="20px"
                                                sx={{
                                                    color: grey[600],
                                                }}
                                            >
                                                @{thread.user.username}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                >
                                    <MoreHorizIcon sx={{ color: grey[500] }} />
                                </Box>
                            </Box>
                        </Box>
                        <Box pt="14px" pb={1}>
                            <Box component={Link} to={`/thread/${thread.id}`}>
                                <Typography
                                    variant="h6"
                                    textAlign="center"
                                    fontWeight="bold"
                                >
                                    {thread.body}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            my="16px"
                            px="6px"
                        >
                            <Box
                                component="time"
                                dateTime={thread.created_at.toString()}
                                color={grey[600]}
                            >
                                {format(
                                    new Date(thread.created_at),
                                    "yyyy年M月d日 HH:mm"
                                )}
                            </Box>
                        </Box>
                        <Box
                            height="48px"
                            px="8px"
                            display="flex"
                            flexDirection="row"
                            borderTop={1}
                            borderBottom={1}
                            borderColor={grey[300]}
                        >
                            <Box
                                mr="auto"
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                            >
                                <PostAnswerButton
                                    data={thread}
                                    toThreadPage={false}
                                />
                            </Box>
                            <Box
                                mr="50px"
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                            >
                                <LikeButton
                                    isThreadCard={true}
                                    mode="thread"
                                    id={thread.id}
                                    defIsLiked={defIsLiked}
                                    defLikesCount={thread.likes_count}
                                />
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                            >
                                <Tooltip
                                    title="ログインしてください"
                                    placement="top"
                                    arrow
                                >
                                    <IconButton sx={{ p: 0 }}>
                                        <BookmarkBorderIcon
                                            sx={{
                                                width: "1.5rem",
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>

                        {/* <Box display="flex">
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
                            </Box> */}
                    </>
                </Box>
            </Box>
        </Box>
    );
};

export default ThreadOdaiCard;