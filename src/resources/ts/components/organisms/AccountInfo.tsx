import { FC } from "react";
import { AccountInfo } from "../../models/User";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { cardAvatar } from "../../hooks/libs/cardAvatar";
import { grey, orange, pink } from "@mui/material/colors";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { format } from "date-fns";

type Props = {
    user?: AccountInfo;
};

const AccountInfo: FC<Props> = ({ user }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            py="20px"
            px="16px"
            borderBottom={1}
            borderColor={grey[100]}
        >
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                mb="20px"
            >
                <Box>
                    <Avatar {...cardAvatar(user?.name as string, 100, 40)} />
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="end">
                    <Box mb="8px">
                        <Button variant="contained">
                            <Typography color="white" fontSize="12px">
                                フォロー
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
            >
                <Box display="flex" flexDirection="column" ml="4px">
                    <Box>
                        <Typography fontSize="20px" fontWeight="bold">
                            {user?.name}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                color: grey[600],
                            }}
                        >
                            @{user?.username}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                >
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <FavoriteIcon
                            sx={{
                                fontSize: "18px",
                                mr: "4px",
                                color: grey[600],
                            }}
                        />
                        <Typography fontWeight="bold">
                            {user?.answer_liked_counts}
                        </Typography>
                        <Typography
                            fontSize="14px"
                            sx={{
                                color: grey[600],
                                ml: "2px",
                            }}
                        >
                            いいね
                        </Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <CalendarMonthIcon
                            sx={{
                                fontSize: "18px",
                                mr: "4px",
                                color: grey[600],
                            }}
                        />
                        <Typography fontWeight="bold">
                            {format(
                                new Date(user?.created_at as Date),
                                "yyyy/M/d"
                            )}
                        </Typography>
                        <Typography
                            fontSize="14px"
                            sx={{
                                color: grey[600],
                                ml: "2px",
                            }}
                        >
                            から利用
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AccountInfo;
