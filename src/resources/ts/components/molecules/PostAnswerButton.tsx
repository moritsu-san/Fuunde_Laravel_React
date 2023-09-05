import { zodResolver } from "@hookform/resolvers/zod";
import {
    Avatar,
    Box,
    Dialog,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Slide,
    Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FC, ReactElement, ReactNode, Ref, forwardRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { inputAvatar } from "../../hooks/libs/inputAvatar";
import SendIcon from "@mui/icons-material/Send";
import useCurrentUser from "../../hooks/user/useCurrentUser";
import { LoadingButton } from "@mui/lab";
import usePostAnswer from "../../hooks/post/usePostAnswer";
import { grey } from "@mui/material/colors";
import { Data } from "../../models/Thread";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { retweetAvatar } from "../../hooks/libs/retweetAvatar";
import { Link } from "react-router-dom";

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

type Props = {
    data: Data;
};

const PostAnswerButton: FC<Props> = ({ data }) => {
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
        reset: resetForm,
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const { error, isLoading, mutate, reset: resetMutation } = usePostAnswer();
    const statusCode = (error as AxiosError)?.response?.status;

    const queryClient = useQueryClient();

    const handlePostAnswer: SubmitHandler<FieldValues> = (formData) => {
        const thread_id = data.id;
        const postData = { formData, thread_id };
        mutate(postData, {
            onSuccess: () => {
                queryClient.invalidateQueries(["answers"]);
                handleClose();
            },
        });
    };

    const user = useCurrentUser();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        resetForm();
        resetMutation();
        setOpen(false);
    };

    return (
        <>
            <IconButton
                onClick={handleClickOpen}
                sx={{
                    p: 0,
                }}
            >
                <ChatBubbleOutlineIcon sx={{ width: "1.25rem" }} />
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit(handlePostAnswer)}
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
                    {/* thread情報 */}
                    <Box mt="12px" mb="-20px">
                        <Box
                            display="flex"
                            flexDirection="column"
                            minHeight="64px"
                            border={1}
                            borderColor={grey[300]}
                            borderRadius="12px"
                            component={Link}
                            to={`/thread/${data.id}`}
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
                                        <Avatar
                                            {...retweetAvatar(data.user.name)}
                                        />
                                    </Box>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        alignItems="baseline"
                                    >
                                        <Box>
                                            <Typography
                                                fontSize="12px"
                                                fontWeight="bold"
                                            >
                                                {data.user.name}
                                            </Typography>
                                        </Box>
                                        <Box
                                            ml="4px"
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="baseline"
                                        >
                                            <Box>
                                                <Typography
                                                    fontSize="12px"
                                                    sx={{
                                                        color: grey[600],
                                                    }}
                                                >
                                                    @{data.user.username}
                                                </Typography>
                                            </Box>
                                            <Box
                                                component="span"
                                                fontSize="12px"
                                                fontWeight="bold"
                                                color={grey[600]}
                                                px="4px"
                                            >
                                                ·
                                            </Box>
                                            <Box>
                                                <Box
                                                    component="time"
                                                    dateTime={data.created_at}
                                                    sx={{
                                                        color: grey[600],
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    {data.diff_for_humans}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box mx="12px" mb="12px">
                                <Box my="4px">
                                    <Typography
                                        component="h6"
                                        fontSize="15px"
                                        textAlign="center"
                                        fontWeight="bold"
                                    >
                                        {data.body}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <ArrowDownwardIcon
                                sx={{
                                    display: "block",
                                    color: grey[400],
                                    mx: "auto",
                                    mt: "-4px",
                                }}
                            />
                        </Box>
                    </Box>
                    {/* 入力するフィールド */}
                    <FormControl
                        variant="standard"
                        fullWidth
                        margin="normal"
                        error={errors.body ? true : false}
                    >
                        <InputLabel htmlFor="post-thread">アンサー</InputLabel>
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
        </>
    );
};

export default PostAnswerButton;
