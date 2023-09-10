import { zodResolver } from "@hookform/resolvers/zod";
import {
    Avatar,
    Box,
    Button,
    Dialog,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Slide,
    Tooltip,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ReactElement, ReactNode, Ref, forwardRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import usePostThread from "../../hooks/post/usePostThread";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import { inputAvatar } from "../../hooks/libs/inputAvatar";
import SendIcon from "@mui/icons-material/Send";
import useCurrentUser from "../../hooks/user/useCurrentUser";
import { LoadingButton } from "@mui/lab";
import SnackBar from "../atoms/SnackBar";

const schema = z.object({
    body: z
        .string()
        .min(1, { message: "入力してください。" })
        .max(30, { message: "30文字以下にしてください。" }),
});

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: (any & Ref<unknown>) | undefined
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PostThreadButton = () => {
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
        reset: resetForm,
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const { error, isLoading, mutate, reset: resetMutation } = usePostThread();
    const statusCode = (error as AxiosError)?.response?.status;

    const queryClient = useQueryClient();

    const handlePostThread: SubmitHandler<FieldValues> = (data) => {
        mutate(data, {
            onSuccess: () => {
                setOpenSnackbar(true);
                queryClient.invalidateQueries(["threads"]);
                handleClose();
            },
        });
    };

    const user = useCurrentUser();

    const [openDialog, setOpenDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        resetForm();
        resetMutation();
        setOpenDialog(false);
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                    display: { xs: "none", xl: "block" },
                    width: "100%",
                    minWidth: "52px",
                    color: "white",
                    fontWeight: "bold",
                }}
            >
                {" "}
                お題を投稿
            </Button>
            <Tooltip
                title="お題を投稿"
                placement="bottom"
                arrow
                PopperProps={{
                    sx: { display: { xl: "none" } },
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{
                        display: { xs: "block", xl: "none" },
                        minWidth: "48px",
                        minHeight: "48px",
                        borderRadius: "50%",
                        color: "white",
                        ml: "4px",
                    }}
                >
                    <CreateIcon sx={{ fontSize: 20 }} />
                </Button>
            </Tooltip>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit(handlePostThread)}
                    noValidate
                    width="500px"
                    px="32px"
                    py="16px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    {/* クローズボタン */}
                    <IconButton onClick={handleClose} sx={{ p: 0, mr: "auto" }}>
                        <CloseIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                    {/* 入力するフィールド */}
                    <FormControl
                        variant="standard"
                        fullWidth
                        margin="normal"
                        error={errors.body ? true : false}
                    >
                        <InputLabel htmlFor="post-thread">お題</InputLabel>
                        <Input
                            id="post-thread"
                            multiline
                            inputProps={{
                                style: {
                                    fontSize: "24px",
                                    lineHeight: "30px",
                                },
                            }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Avatar
                                        {...inputAvatar(user?.name as string)}
                                    />
                                </InputAdornment>
                            }
                            {...register("body")}
                        />
                        <FormHelperText
                            id="post-thread-error-text"
                            sx={{ color: "error.main" }}
                        >
                            {(errors.body?.message as ReactNode) || statusCode
                                ? null
                                : "　"}
                            {errors.body?.message as ReactNode}
                            {statusCode &&
                                `エラーにより投稿できませんでした。(${statusCode})`}
                        </FormHelperText>
                    </FormControl>
                    {/* 送信ボタン */}
                    <LoadingButton
                        loading={isLoading}
                        endIcon={<SendIcon />}
                        loadingPosition="end"
                        disabled={!isValid}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2, mb: 2, ml: "auto" }}
                    >
                        投稿
                    </LoadingButton>
                </Box>
            </Dialog>
            <SnackBar defOpen={openSnackbar} message="お題を投稿しました!" />
        </>
    );
};

export default PostThreadButton;
