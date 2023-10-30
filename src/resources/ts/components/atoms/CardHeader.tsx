import { FC } from "react";
import { odaiData } from "../../models/Odai";
import { answerData } from "../../models/Answer";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

type Props = {
    data: odaiData | answerData;
};

const CardHeader: FC<Props> = ({ data }) => {
    return (
        <Box display="flex" justifyContent="space-between" mb="2px">
            <Box display="flex" minWidth={0}>
                <Box
                    display="block"
                    component={Link}
                    to={`/user/${data.user.username}`}
                    minWidth={0}
                >
                    <Typography fontSize={15} fontWeight="bold">
                        {data.user.name}
                    </Typography>
                </Box>
                <Box
                    display="block"
                    component={Link}
                    to={`/user/${data.user.username}`}
                    minWidth={0}
                    ml="4px"
                >
                    <Typography fontSize={15} color={grey[600]}>
                        @{data.user.username}
                    </Typography>
                </Box>
                <Box
                    component="span"
                    fontSize={15}
                    fontWeight="bold"
                    color={grey[600]}
                    px="4px"
                >
                    ·
                </Box>
                <Box component={Link} to={`/user/${data.user.username}`}>
                    <Box
                        component="time"
                        dateTime={data.created_at.toString()}
                        color={grey[600]}
                        fontSize={15}
                        whiteSpace="nowrap"
                    >
                        {data.diff_for_humans}
                    </Box>
                </Box>
            </Box>
            <Box ml="6px">
                <MoreHorizIcon sx={{ color: grey[500] }} />
            </Box>
        </Box>
    );
};

export default CardHeader;
