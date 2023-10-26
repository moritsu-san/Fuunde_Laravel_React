import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
    defOpen: boolean;
    message: string | null;
};

function TransitionLeft(props: JSX.IntrinsicAttributes & SlideProps) {
    return <Slide {...props} direction="left" />;
}

const SuccessSnackBar: FC<Props> = ({ defOpen, message }) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(defOpen);
    }, [defOpen]);

    const handleClose = () => {
        setOpen(false);
        queryClient.setQueryData(["openSnackbar"], null);
    };

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

export default SuccessSnackBar;
