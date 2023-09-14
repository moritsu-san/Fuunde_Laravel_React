import { Box, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useHistory } from "react-router-dom";
import { FC } from "react";

type Props = {
    name?: string;
};

const AccountMainHeader: FC<Props> = ({ name }) => {
    const history = useHistory();
    return (
        <Box
            display="flex"
            flexDirection="column"
            position="sticky"
            top="-0.5px"
            bgcolor="rgba(255, 255, 255, 0.85)"
            zIndex="3"
            sx={{ backdropFilter: "blur(8px)" }}
            borderBottom={1}
            borderColor={grey[300]}
        >
            <Box zIndex="2">
                <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    width="100%"
                    height="53px"
                    px="4px"
                    sx={{ maxWidth: { sm: "600px" } }}
                >
                    <Box>
                        <IconButton
                            disableRipple
                            onClick={() => {
                                history.goBack();
                            }}
                        >
                            <ArrowBackOutlinedIcon color="primary" />
                        </IconButton>
                    </Box>
                    <Box mt="2px" ml={2}>
                        <Typography
                            component="h2"
                            sx={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                            {name}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AccountMainHeader;
