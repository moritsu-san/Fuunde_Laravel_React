import { FC } from "react";
import { userData } from "../../models/Odai";
import { Avatar, Box } from "@mui/material";
import { cardAvatarProps } from "../../hooks/libs/cardAvatarProps";
import { Link } from "react-router-dom";

type Props = {
    user: userData;
};

const CardAvatar: FC<Props> = ({ user }) => {
    return (
        <Box mr="12px">
            <Box component={Link} to={`/user/${user.username}`}>
                <Avatar {...cardAvatarProps(user.name)} />
            </Box>
        </Box>
    );
};

export default CardAvatar;
