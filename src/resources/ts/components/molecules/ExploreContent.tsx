import { Box, List, Typography } from "@mui/material";
import { FC } from "react";
import { Data } from "../../models/Thread";
import { UseQueryResult } from "@tanstack/react-query";
import OdaiContent from "./OdaiContent";
import { grey } from "@mui/material/colors";

type Props = {
    isFetching: boolean;
    data?: Data[];
    isPaused: boolean;
    refetch: (options?: {
        throwOnError: boolean;
        cancelRefetch: boolean;
    }) => Promise<UseQueryResult>;
};

const ExploreContent: FC<Props> = ({ isFetching, data, isPaused, refetch }) => {
    return (
        <Box display="flex" flexDirection="column" height={700}>
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
                <List
                    sx={{
                        width: "100%",
                    }}
                >
                    <OdaiContent
                        isFetching={isFetching}
                        data={data}
                        isPaused={isPaused}
                        refetch={refetch}
                    />
                </List>
            </Box>
        </Box>
    );
};

export default ExploreContent;
