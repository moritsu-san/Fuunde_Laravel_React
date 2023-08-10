import { Box, ListItem, Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";

type Props = {
    cardNum: number;
};

const ThreadCardSkeleton: FC<Props> = ({ cardNum }) => {
    return (
        <div>
            {Array(cardNum)
                .fill(0)
                .map((item, i) => (
                    <ListItem key={i} sx={{ width: 1, p: 0 }}>
                        <Box
                            width={1}
                            sx={{ borderBottom: 1, borderColor: grey[300] }}
                        >
                            <Box
                                component="article"
                                width={1}
                                py={1}
                                px={2}
                                sx={{ cursor: "pointer" }}
                            >
                                <Box display="flex">
                                    <Box mr="12px">
                                        <Skeleton
                                            variant="circular"
                                            width={40}
                                            height={40}
                                        />
                                    </Box>
                                    <Box pb="12px" width={1}>
                                        <Box mb="2px">
                                            <Skeleton
                                                variant="text"
                                                sx={{
                                                    fontSize: "15px",
                                                    width: "40%",
                                                }}
                                            />
                                        </Box>
                                        <Box py={1}>
                                            <Skeleton
                                                variant="text"
                                                sx={{
                                                    fontSize: "1.25rem",
                                                    lineHeight: "1.6",
                                                    width: "40%",
                                                    mx: "auto",
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </ListItem>
                ))}
        </div>
    );
};

export default ThreadCardSkeleton;
