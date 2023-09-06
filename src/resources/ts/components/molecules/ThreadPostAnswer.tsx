import { LoadingButton } from "@mui/lab";
import {
    Avatar,
    Box,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import * as z from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import usePostAnswer from "../../hooks/post/usePostAnswer";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Data } from "../../models/Thread";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import useCurrentUser from "../../hooks/user/useCurrentUser";
import { cardAvatar } from "../../hooks/libs/cardAvatar";
import { User } from "../../models/User";

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

    const { error, isLoading, mutate, reset: resetMutation } = usePostAnswer();
    const statusCode = (error as AxiosError)?.response?.status;

    const queryClient = useQueryClient();

    const handlePostAnswer: SubmitHandler<FieldValues> = (formData) => {
        const thread_id = thread.id;
        const postData = { formData, thread_id };
        mutate(postData, {
            onSuccess: () => {
                resetForm();
                // queryClient.invalidateQueries(["answers"]);
            },
        });
    };

    return (
        <Box
            pt="4px"
            px={2}
            pb="8px"
            display="flex"
            flexDirection="row"
            alignItems="stretch"
        >
            <Box
                component={Link}
                to={`/user/${user?.username}`}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                mr="12px"
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
                    error={errors.body ? true : false}
                >
                    <Input
                        id="post-thread"
                        multiline
                        inputProps={{
                            style: {
                                fontSize: "24px",
                                lineHeight: "30px",
                            },
                        }}
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
                    disabled={!isValid}
                    type="submit"
                    variant="contained"
                    sx={{ height: "40px", ml: "16px" }}
                >
                    投稿
                </LoadingButton>
            </Box>
        </Box>
    );
};
export default ThreadPostAnswer;
