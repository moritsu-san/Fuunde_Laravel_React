import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";
import { answerData } from "../../models/Thread";
import CardAvatar from "../atoms/CardAvatar";
import CardHeader from "../atoms/CardHeader";
import CardFooter from "../atoms/CardFooter";

type Props = {
    data: answerData;
};

const ThreadAnswerCard: FC<Props> = ({ data }) => {
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
                        <Box pt={1} pb="4px">
                            <Typography
                                variant="h6"
                                textAlign="center"
                                fontWeight="bold"
                            >
                                {data.body}
                            </Typography>
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

export default ThreadAnswerCard;
