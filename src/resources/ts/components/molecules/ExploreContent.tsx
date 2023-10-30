import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { odaiData } from "../../models/Odai";
import { UseQueryResult } from "@tanstack/react-query";
import OdaiContent from "./OdaiContent";
import { grey } from "@mui/material/colors";

type Props = {
    isFetching: boolean;
    data?: odaiData[];
    isPaused: boolean;
    refetch: (options?: {
        throwOnError: boolean;
        cancelRefetch: boolean;
    }) => Promise<UseQueryResult>;
};

const ExploreContent: FC<Props> = ({ isFetching, data, isPaused, refetch }) => {
    return (
        <Box>
            <Box
                px="12px"
                py="12px"
                bgcolor={grey[100]}
                borderBottom={1}
                borderColor={grey[300]}
            >
                <Typography fontSize="20px" fontWeight="bold">
                    🔥HOTなお題🔥
                </Typography>
            </Box>
            <Box>
                <ul>
                    <OdaiContent
                        isFetching={isFetching}
                        data={data}
                        isPaused={isPaused}
                        refetch={refetch}
                    />
                </ul>
            </Box>
        </Box>
    );
};

export default ExploreContent;
