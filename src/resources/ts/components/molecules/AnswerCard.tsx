import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { Data } from "../../models/Answer";
import { cardAvatar } from "../../hooks/libs/cardAvatar";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LikeButton from "../atoms/LikeButton";
import useCurrentUser from "../../hooks/user/useCurrentUser";
import { retweetAvatar } from "../../hooks/libs/retweetAvatar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

type Props = {
    data: Data;
};

const AnswerCard: FC<Props> = ({ data }) => {
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
                            {/* ユーザー情報 */}
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
                                                    dateTime={data.created_at.toString()}
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
                            {/* 本文 */}
                            <Box
                                pt="14px"
                                pb={1}
                                component={Link}
                                to={`/thread/${data.thread.id}`}
                            >
                                <Typography
                                    variant="h6"
                                    textAlign="center"
                                    fontWeight="bold"
                                >
                                    {data.body}
                                </Typography>
                            </Box>
                            {/* thread情報 */}
                            <Box mt="8px">
                                <Box>
                                    <ArrowUpwardIcon
                                        sx={{
                                            display: "block",
                                            color: grey[400],
                                            mx: "auto",
                                            mb: "-4px",
                                        }}
                                    />
                                </Box>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    minHeight="64px"
                                    border={1}
                                    borderColor={grey[300]}
                                    borderRadius="12px"
                                    sx={{ cursor: "pointer" }}
                                    component={Link}
                                    to={`/thread/${data.thread.id}`}
                                >
                                    <Box mt="4px" mx="12px">
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                        >
                                            <Box
                                                display="block"
                                                width="20px"
                                                height="20px"
                                                mr="4px"
                                            >
                                                <Avatar
                                                    {...retweetAvatar(
                                                        data.thread.user.name
                                                    )}
                                                />
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                                alignItems="baseline"
                                            >
                                                <Box>
                                                    <Typography
                                                        fontSize="12px"
                                                        fontWeight="bold"
                                                    >
                                                        {data.thread.user.name}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    ml="4px"
                                                    display="flex"
                                                    flexDirection="row"
                                                    alignItems="baseline"
                                                >
                                                    <Box>
                                                        <Typography
                                                            fontSize="12px"
                                                            sx={{
                                                                color: grey[600],
                                                            }}
                                                        >
                                                            @
                                                            {
                                                                data.thread.user
                                                                    .username
                                                            }
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        component="span"
                                                        fontSize="12px"
                                                        fontWeight="bold"
                                                        color={grey[600]}
                                                        px="4px"
                                                    >
                                                        ·
                                                    </Box>
                                                    <Box>
                                                        <Box
                                                            component="time"
                                                            dateTime={data.thread.created_at.toString()}
                                                            sx={{
                                                                color: grey[600],
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            {
                                                                data.thread
                                                                    .diff_for_humans
                                                            }
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box mx="12px" mb="12px">
                                        <Box my="4px">
                                            <Typography
                                                component="h6"
                                                fontSize="15px"
                                                textAlign="center"
                                                fontWeight="bold"
                                            >
                                                {data.thread.body}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            {/* フッター情報 */}
                            <Box display="flex" mt="12px">
                                <Box mr="auto"></Box>
                                <Box mr="50px">
                                    <LikeButton
                                        mode="answer"
                                        id={data.id}
                                        defIsLiked={defIsLiked}
                                        defLikesCount={data.likes_count}
                                    />
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
                </Box>
            </Box>
        </Box>
    );
};

export default AnswerCard;
