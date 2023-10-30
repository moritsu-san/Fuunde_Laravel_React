import { FC } from "react";
import { odaiData } from "../../models/Odai";
import { Avatar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { cardAvatarProps } from "../../hooks/libs/cardAvatarProps";
import { grey } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { format } from "date-fns";
import CardFooter from "../atoms/CardFooter";

type Props = {
    thread: odaiData;
};

const ThreadOdaiCard: FC<Props> = ({ thread }) => {
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
                                    <Avatar
                                        {...cardAvatarProps(thread.user.name)}
                                    />
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
                            p="8px"
                            borderTop={1}
                            borderBottom={1}
                            borderColor={grey[300]}
                        >
                            <CardFooter
                                isThreadCard={true}
                                mode="odai"
                                data={thread}
                            />
                        </Box>
                    </>
                </Box>
            </Box>
        </Box>
    );
};

export default ThreadOdaiCard;
