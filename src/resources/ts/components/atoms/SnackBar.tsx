import { Alert, IconButton, Slide, SlideProps, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC, useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

type Props = {
    defOpen: boolean;
    message: string;
};

function TransitionLeft(props: JSX.IntrinsicAttributes & SlideProps) {
    return <Slide {...props} direction="left" />;
}

const SnackBar: FC<Props> = ({ defOpen, message }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(defOpen);
    }, [defOpen]);

    const handleClose = () => {
        setOpen(false);
    };

    // const action = (
    //     <IconButton
    //         size="small"
    //         aria-label="close"
    //         color="inherit"
    //         onClick={handleClose}
    //     >
    //         <CloseIcon fontSize="small" />
    //     </IconButton>
    // );

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            TransitionComponent={TransitionLeft}
        >
            <Alert
                variant="filled"
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;
