import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const Thread = () => {
    const { threadId } = useParams<{ threadId: string }>();

    return <Box>{threadId}</Box>;
};

export default Thread;
