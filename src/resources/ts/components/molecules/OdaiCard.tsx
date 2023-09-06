import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Link } from "react-router-dom";
import { Data } from "../../models/Thread";
import { cardAvatar } from "../../hooks/libs/cardAvatar";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LikeButton from "../atoms/LikeButton";
import useCurrentUser from "../../hooks/user/useCurrentUser";
import PostAnswerButton from "./PostAnswerButton";

type Props = {
    data: Data;
};

const OdaiCard: FC<Props> = ({ data }) => {
    const user = useCurrentUser();

    const defIsLiked =
        data.likes?.find((i) => i.username === user?.username) === undefined
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
                                to={`/user/${data.user.username}`}
                            >
                                <Avatar {...cardAvatar(data.user.name)} />
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
                                                to={`/user/${data.user.username}`}
                                            >
                                                <Typography
                                                    fontSize="15px"
                                                    fontWeight="bold"
                                                >
                                                    {data.user.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box ml="4px">
                                            <Box
                                                component={Link}
                                                to={`/user/${data.user.username}`}
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
                                                to={`/user/${data.user.username}`}
                                            >
                                                <Box
                                                    component="time"
                                                    dateTime={data.created_at}
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
                            <Box
                                pt="14px"
                                pb={1}
                                component={Link}
                                to={`/thread/${data.id}`}
                            >
                                <Typography
                                    variant="h6"
                                    textAlign="center"
                                    fontWeight="bold"
                                >
                                    {data.body}
                                </Typography>
                            </Box>
                            <Box display="flex">
                                <Box mr="auto">
                                    {user ? (
                                        <PostAnswerButton data={data} />
                                    ) : (
                                        <Tooltip
                                            title="ログインしてください"
                                            placement="top"
                                            arrow
                                        >
                                            <IconButton sx={{ p: 0 }}>
                                                <ChatBubbleOutlineIcon
                                                    sx={{ width: "1.25rem" }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>
                                <Box mr="50px">
                                    <LikeButton
                                        mode="thread"
                                        id={data.id}
                                        defIsLiked={defIsLiked}
                                        defLikesCount={data.likes_count}
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
                                                sx={{ width: "1.25rem" }}
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

export default OdaiCard;
