import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";
import { Link } from "react-router-dom";
import { answerData } from "../../models/Answer";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CardAvatar from "../atoms/CardAvatar";
import CardHeader from "../atoms/CardHeader";
import CardFooter from "../atoms/CardFooter";
import RetweetCard from "../atoms/RetweetCard";

type Props = {
    data: answerData;
};

const AnswerCard: FC<Props> = ({ data }) => {
    return (
        <Box width={1} borderBottom={1} borderColor={grey[300]}>
            <Box
                component="article"
                pt="10px"
                pb="6px"
                px={2}
                sx={{ cursor: "pointer" }}
            >
                <Box display="flex">
                    <CardAvatar user={data.user} />
                    <Box flexGrow={1} minWidth={0}>
                        <CardHeader data={data} />
                        {/* 本文 */}
                        <Box
                            display="block"
                            py={1}
                            component={Link}
                            to={`/thread/${data.thread.id}`}
                        >
                            <Typography
                                variant="h6"
                                textAlign="center"
                                fontWeight="bold"
                            >
                                {data.body}
                            </Typography>
                        </Box>
                        {/* thread情報 */}
                        <Box my={1}>
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
                            <RetweetCard data={data.thread} />
                        </Box>
                        <CardFooter
                            isThreadCard={false}
                            mode="answer"
                            data={data}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AnswerCard;
