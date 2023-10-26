import { Box, Button, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { FC } from "react";
import { UseQueryResult } from "@tanstack/react-query";

type Props = {
    refetch: (options?: {
        throwOnError: boolean;
        cancelRefetch: boolean;
    }) => Promise<UseQueryResult>;
};

const RetryQuery: FC<Props> = ({ refetch }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            pt="120px"
            px="30px"
        >
            <Box py="40px">
                <Typography>
                    問題が発生しました。再読み込みしてください。
                </Typography>
            </Box>
            <Box>
                <Button
                    variant="contained"
                    startIcon={<ReplayIcon sx={{ color: "white" }} />}
                    disableRipple
                    onClick={() => {
                        refetch();
                    }}
                >
                    <Typography color="white">再読み込み</Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default RetryQuery;
