import { FC } from "react";
import { odaiData } from "../../models/Odai";
import { Avatar, Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { cardAvatarProps } from "../../hooks/libs/cardAvatarProps";
import { Link } from "react-router-dom";
import { threadData } from "../../models/Answer";

type Props = {
    data: odaiData | threadData;
};

const RetweetCard: FC<Props> = ({ data }) => {
    return (
        <Box
            display="block"
            minHeight="64px"
            pt="4px"
            px="12px"
            pb="12px"
            border={1}
            borderColor={grey[300]}
            borderRadius="4px"
            sx={{ cursor: "pointer" }}
            component={Link}
            to={`/thread/${data.id}`}
        >
            <Box display="flex" flexDirection="row" alignItems="baseline">
                <Box mr="4px">
                    <Avatar {...cardAvatarProps(data.user.name, 20, 12)} />
                </Box>
                <Box
                    flexGrow={1}
                    display="flex"
                    alignItems="baseline"
                    minWidth={0}
                >
                    <Box minWidth={0}>
                        <Typography fontSize={12} fontWeight="bold">
                            {data.user.name}
                        </Typography>
                    </Box>
                    <Box minWidth={0} ml="4px">
                        <Typography fontSize={12} color={grey[600]}>
                            @{data.user.username}
                        </Typography>
                    </Box>
                    <Box
                        component="span"
                        fontSize={12}
                        fontWeight="bold"
                        color={grey[600]}
                        px="4px"
                    >
                        ·
                    </Box>
                    <Box>
                        <Box
                            component="time"
                            dateTime={data.created_at.toString()}
                            color={grey[600]}
                            fontSize={12}
                            whiteSpace="nowrap"
                        >
                            {data.diff_for_humans}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Box my="4px">
                    <Typography
                        component="h6"
                        fontSize="15px"
                        textAlign="center"
                        fontWeight="bold"
                    >
                        {data.body}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default RetweetCard;
