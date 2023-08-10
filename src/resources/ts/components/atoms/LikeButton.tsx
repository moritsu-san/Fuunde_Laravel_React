import { Box, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FC, useState } from "react";
import { pink } from "@mui/material/colors";
import useCurrentUser from "../../hooks/user/useCurrentUser";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

type Props = {
    id: number;
    defIsLiked: boolean;
    defLikesCount: number;
};

const LikeButton: FC<Props> = ({ id, defIsLiked, defLikesCount }) => {
    const user = useCurrentUser();
    const [isLiked, setIsLiked] = useState(defIsLiked);
    const [likesCount, setLikesCount] = useState(defLikesCount);

    const like = async () => {
        const { data } = await axios.put(`/api/thread/${id}/like`);
        return data;
    };

    const unlike = async () => {
        const { data } = await axios.delete(`/api/thread/${id}/like`);
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
            alert("いいね機能はログイン中のみ使用できます");
            return;
        }

        isLiked ? mutateUnlike() : mutateLike();
    };

    return (
        <Box display="flex">
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
                {isLiked ? (
                    <FavoriteIcon sx={{ color: pink[500], width: "1.25rem" }} />
                ) : (
                    <FavoriteBorderIcon sx={{ width: "1.25rem" }} />
                )}
            </IconButton>
            <Box ml="8px">{likesCount}</Box>
        </Box>
    );
};

export default LikeButton;
