import { Box, IconButton, ListItem, Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

type Props = {
    cardNum: number;
};

const AnswerCardSkeleton: FC<Props> = ({ cardNum }) => {
    return (
        <div>
            {Array(cardNum)
                .fill(0)
                .map((item, i) => (
                    <ListItem key={i} sx={{ width: 1, p: 0 }}>
                        <Box width={1} borderBottom={1} borderColor={grey[300]}>
                            <Box
                                component="article"
                                width={1}
                                py={1}
                                pb="4px"
                                px={2}
                                sx={{ cursor: "pointer" }}
                            >
                                <Box display="flex">
                                    <>
                                        <Box
                                            mr="12px"
                                            display="flex"
                                            flexDirection="column"
                                        >
                                            <Skeleton
                                                variant="circular"
                                                width={40}
                                                height={40}
                                            />
                                        </Box>
                                        <Box pb="8px" width={1}>
                                            {/* ユーザー情報 */}
                                            <Box mb="2px">
                                                <Skeleton
                                                    variant="text"
                                                    sx={{
                                                        fontSize: "15px",
                                                        width: "40%",
                                                    }}
                                                />
                                            </Box>
                                            {/* 本文 */}
                                            <Box pt="14px" pb={1}>
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
                                            {/* thread情報 */}
                                            <Box mt="8px">
                                                <Box>
                                                    <ArrowUpwardIcon
                                                        sx={{
                                                            display: "block",
                                                            color: grey[400],
                                                            mx: "auto",
                                                            mb: "-4px",
                                                        }}
                                                    />
                                                </Box>
                                                <Box
                                                    display="flex"
                                                    flexDirection="column"
                                                    minHeight="64px"
                                                    border={1}
                                                    borderColor={grey[300]}
                                                    borderRadius="12px"
                                                    sx={{ cursor: "pointer" }}
                                                >
                                                    <Box mt="4px" mx="12px">
                                                        <Box
                                                            display="flex"
                                                            flexDirection="row"
                                                            alignItems="center"
                                                        >
                                                            <Box
                                                                display="block"
                                                                width="20px"
                                                                height="20px"
                                                                mr="4px"
                                                            >
                                                                <Skeleton
                                                                    variant="circular"
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                            </Box>
                                                            <Skeleton
                                                                variant="text"
                                                                sx={{
                                                                    fontSize:
                                                                        "1rem",
                                                                    lineHeight:
                                                                        "1.5",
                                                                    width: "40%",
                                                                }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                    <Box mx="12px" mb="12px">
                                                        <Box my="4px">
                                                            <Skeleton
                                                                variant="text"
                                                                sx={{
                                                                    fontSize:
                                                                        "15px",
                                                                    lineHeight:
                                                                        "1.5",
                                                                    width: "40%",
                                                                    mx: "auto",
                                                                }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            {/* フッター情報 */}
                                            <Box display="flex" mt="12px">
                                                <Box mr="auto"></Box>
                                                <Box mr="50px">
                                                    <IconButton sx={{ p: 0 }}>
                                                        <FavoriteBorderIcon
                                                            sx={{
                                                                width: "1.25rem",
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Box>
                                                <Box mr="20px">
                                                    <IconButton sx={{ p: 0 }}>
                                                        <BookmarkBorderIcon
                                                            sx={{
                                                                width: "1.25rem",
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </>
                                </Box>
                            </Box>
                        </Box>
                    </ListItem>
                ))}
        </div>
    );
};

export default AnswerCardSkeleton;
