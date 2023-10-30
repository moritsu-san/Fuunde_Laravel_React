import { FC } from "react";
import { odaiData } from "../../models/Odai";
import { answerData } from "../../models/Answer";
import { Box, IconButton, Tooltip } from "@mui/material";
import LikeButton from "./LikeButton";
import PostAnswerButton from "../molecules/PostAnswerButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import useCurrentUser from "../../hooks/user/useCurrentUser";

type Props = {
    isThreadCard: boolean;
    mode: "odai" | "answer";
    data: odaiData | answerData;
};

const CardFooter: FC<Props> = ({ isThreadCard, mode, data }) => {
    const user = useCurrentUser();

    const defIsLiked =
        data.likes?.find((i) => i.username === user?.username) === undefined
            ? false
            : true;

    return (
        <Box display="flex" justifyContent="space-between">
            <Box flexGrow={5}>
                {mode === "odai" && (
                    <PostAnswerButton data={data} isRoute={!isThreadCard} />
                )}
            </Box>
            <Box display="flex" flexGrow={1} justifyContent="space-between">
                <Box>
                    <LikeButton
                        isThreadCard={isThreadCard}
                        mode={mode === "odai" ? "thread" : "answer"}
                        id={data.id}
                        defIsLiked={defIsLiked}
                        defLikesCount={data.likes_count}
                    />
                </Box>
                <Box>
                    <Tooltip title="ログインしてください" placement="top" arrow>
                        <IconButton sx={{ p: 0 }}>
                            <BookmarkBorderIcon
                                sx={{
                                    width: isThreadCard ? "1.5rem" : "1.25rem",
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
};

export default CardFooter;
