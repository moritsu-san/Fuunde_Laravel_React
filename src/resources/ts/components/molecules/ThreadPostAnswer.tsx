import { LoadingButton } from "@mui/lab";
import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormHelperText,
    OutlinedInput,
} from "@mui/material";
import * as z from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import usePostAnswer from "../../hooks/post/usePostAnswer";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Data } from "../../models/Thread";
import { FC, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import useCurrentUser from "../../hooks/user/useCurrentUser";
import { cardAvatar } from "../../hooks/libs/cardAvatar";
import { grey } from "@mui/material/colors";
import SnackBar from "../atoms/SnackBar";

type Props = {
    thread: Data;
};

const schema = z.object({
    body: z
        .string()
        .min(1, { message: "入力してください。" })
        .max(30, { message: "30文字以下にしてください。" }),
});

const ThreadPostAnswer: FC<Props> = ({ thread }) => {
    const user = useCurrentUser();

    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
        reset: resetForm,
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const { error, isLoading, mutate } = usePostAnswer();
    const isTooBig = errors.body?.type === "too_big";
    const statusCode = (error as AxiosError)?.response?.status;

    const queryClient = useQueryClient();

    const handlePostAnswer: SubmitHandler<FieldValues> = (formData) => {
        const thread_id = thread.id;
        const postData = { formData, thread_id };
        mutate(postData, {
            onSuccess: () => {
                resetForm();
                setOpen(true);
                queryClient.invalidateQueries(["thread"]);
            },
        });
    };

    const [open, setOpen] = useState(false);

    return (
        <>
            <Box
                pt={isTooBig || statusCode ? "4px" : "14px"}
                px={2}
                display="flex"
                flexDirection="row"
                alignItems="stretch"
                borderBottom={1}
                borderColor={grey[300]}
            >
                <Box
                    component={Link}
                    to={`/user/${user?.username}`}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    mr="12px"
                    mb="20px"
                >
                    <Avatar {...cardAvatar(user?.name as string)} />
                </Box>
                <Box
                    component="form"
                    onSubmit={handleSubmit(handlePostAnswer)}
                    noValidate
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width={1}
                >
                    {/* 入力するフィールド */}
                    <FormControl
                        variant="standard"
                        fullWidth
                        margin="normal"
                        error={isTooBig ? true : false}
                    >
                        <OutlinedInput
                            id="post-thread"
                            placeholder="アンサーを入力"
                            multiline
                            inputProps={{
                                style: {
                                    border: "none",
                                    fontSize: "16px",
                                    lineHeight: "30px",
                                },
                            }}
                            {...register("body")}
                        />
                        <FormHelperText
                            id="post-thread-error-text"
                            sx={{ color: "error.main" }}
                        >
                            {isTooBig || statusCode ? null : "　"}
                            {isTooBig && (errors.body?.message as ReactNode)}
                            {statusCode &&
                                `エラーにより投稿できませんでした。(${statusCode})`}
                        </FormHelperText>
                    </FormControl>
                    {/* 送信ボタン */}
                    <LoadingButton
                        loading={isLoading}
                        disabled={!isValid}
                        type="submit"
                        variant="contained"
                        sx={{ height: "40px", ml: "16px", mb: "20px" }}
                    >
                        投稿
                    </LoadingButton>
                </Box>
            </Box>
            <SnackBar defOpen={open} message="アンサーを投稿しました!" />
        </>
    );
};
export default ThreadPostAnswer;
