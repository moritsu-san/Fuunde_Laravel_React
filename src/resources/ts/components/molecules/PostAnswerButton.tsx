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
    Tooltip,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FC, ReactElement, ReactNode, Ref, forwardRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { AxiosError } from "axios";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { inputAvatar } from "../../hooks/libs/inputAvatar";
import SendIcon from "@mui/icons-material/Send";
import useCurrentUser from "../../hooks/user/useCurrentUser";
import { LoadingButton } from "@mui/lab";
import usePostAnswer from "../../hooks/post/usePostAnswer";
import { grey } from "@mui/material/colors";
import { odaiData } from "../../models/Odai";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useHistory } from "react-router-dom";
import RetweetCard from "../atoms/RetweetCard";

const schema = z.object({
    body: z
        .string()
        .refine((val) => val.trim().length, "入力してください。")
        .refine(
            (val) => val.length <= 30,
            (val) => ({
                message: `30文字以下にしてください。(${val.length}文字) `,
            })
        ),
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
    data: odaiData;
    isRoute: boolean;
};

const PostAnswerButton: FC<Props> = ({ data, isRoute }) => {
    const history = useHistory();

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
    const isPaused = (error as AxiosError)?.message === "Network Error";
    const isFrontError = (errors?.body?.message as string)?.indexOf("30") === 0;

    const handlePostAnswer: SubmitHandler<FieldValues> = (formData) => {
        const thread_id = data.id;
        const postData = { formData, thread_id };
        mutate(postData, {
            onSuccess: (data) => {
                handleClose();
                if (isRoute) {
                    history.push(`/thread/${data.thread_id}`);
                }
            },
        });
    };

    const user = useCurrentUser();

    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        resetForm();
        resetMutation();
        setOpenDialog(false);
    };

    if (user) {
        return (
            <>
                <IconButton
                    onClick={handleClickOpen}
                    sx={{
                        p: 0,
                    }}
                    disableRipple
                >
                    <ChatBubbleOutlineIcon
                        sx={{ width: isRoute ? "1.25rem" : "1.5rem" }}
                    />
                </IconButton>
                <Dialog
                    open={openDialog}
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
                        <IconButton
                            onClick={handleClose}
                            sx={{ p: 0, mr: "auto" }}
                        >
                            <CloseIcon sx={{ fontSize: 24 }} />
                        </IconButton>
                        {/* thread情報 */}
                        <Box mt="12px" mb="-20px">
                            <RetweetCard data={data} />
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
                            error={isFrontError}
                        >
                            <InputLabel htmlFor="post-thread">
                                アンサー
                            </InputLabel>
                            <Input
                                id="post-thread"
                                multiline
                                inputProps={{
                                    style: {
                                        fontSize: "24px",
                                        lineHeight: "30px",
                                    },
                                    maxLength: 100,
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Avatar
                                            {...inputAvatar(
                                                user?.name as string
                                            )}
                                        />
                                    </InputAdornment>
                                }
                                {...register("body")}
                            />
                            <FormHelperText
                                id="post-thread-error-text"
                                sx={{ color: "error.main" }}
                            >
                                {isFrontError || statusCode || isPaused
                                    ? null
                                    : "　"}
                                {isFrontError &&
                                    (errors.body?.message as ReactNode)}
                                {statusCode &&
                                    `エラーにより投稿できませんでした。(${statusCode})`}
                                {isPaused &&
                                    "インターネットに接続されておらず、投稿できません。"}
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
    } else {
        return (
            <Tooltip title="ログインしてください" placement="top" arrow>
                <IconButton sx={{ p: 0 }}>
                    <ChatBubbleOutlineIcon sx={{ width: "1.25rem" }} />
                </IconButton>
            </Tooltip>
        );
    }
};

export default PostAnswerButton;
