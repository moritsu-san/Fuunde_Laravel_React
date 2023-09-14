import { Box, IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FC, useEffect, useState } from "react";
import { pink } from "@mui/material/colors";
import useCurrentUser from "../../hooks/user/useCurrentUser";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

type Props = {
    isThreadCard: boolean;
    mode: "answer" | "thread";
    id: number;
    defIsLiked: boolean;
    defLikesCount: number;
};

const LikeButton: FC<Props> = ({
    isThreadCard,
    mode,
    id,
    defIsLiked,
    defLikesCount,
}) => {
    const [isLiked, setIsLiked] = useState(defIsLiked);
    const [likesCount, setLikesCount] = useState(defLikesCount);

    useEffect(() => {
        setIsLiked(defIsLiked);
        setLikesCount(defLikesCount);
    }, [defIsLiked, defLikesCount]);

    const user = useCurrentUser();

    const likeEndpoint = `/api/${mode}/${id}/like`;
    const unlikeEndpoint = `/api/${mode}/${id}/like`;

    const like = async () => {
        const { data } = await axios.put(likeEndpoint);
        return data;
    };

    const unlike = async () => {
        const { data } = await axios.delete(unlikeEndpoint);
        return data;
    };

    const { mutate: mutateLike } = useMutation(like, {
        onMutate: () => {
            setIsLiked(true);
            setLikesCount(likesCount + 1);
        },
        onError: () => {
            setIsLiked(false);
            setLikesCount(likesCount - 1);
        },
    });

    const { mutate: mutateUnlike } = useMutation(unlike, {
        onMutate: () => {
            setIsLiked(false);
            setLikesCount(likesCount - 1);
        },
        onError: () => {
            setIsLiked(true);
            setLikesCount(likesCount + 1);
        },
    });

    const handleClick = () => {
        if (!user) {
            return;
        }

        isLiked ? mutateUnlike() : mutateLike();
    };

    return (
        <Box display="flex">
            <Tooltip
                title={user ? "" : "ログインしてください"}
                placement="top"
                arrow
            >
                <IconButton onClick={handleClick} sx={{ p: 0 }} disableRipple>
                    {isLiked ? (
                        <FavoriteIcon
                            sx={{
                                color: pink[500],
                                width: isThreadCard ? "1.5rem" : "1.25rem",
                            }}
                        />
                    ) : (
                        <FavoriteBorderIcon
                            sx={{ width: isThreadCard ? "1.5rem" : "1.25rem" }}
                        />
                    )}
                </IconButton>
            </Tooltip>

            <Box ml="8px">{likesCount}</Box>
        </Box>
    );
};

export default LikeButton;
