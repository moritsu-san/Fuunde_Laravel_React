import { LoadingButton } from "@mui/lab";
import {
    Avatar,
    Box,
    FormControl,
    FormHelperText,
    OutlinedInput,
} from "@mui/material";
import * as z from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import usePostAnswer from "../../hooks/post/usePostAnswer";
import { AxiosError } from "axios";
import { odaiData } from "../../models/Odai";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import useCurrentUser from "../../hooks/user/useCurrentUser";
import { cardAvatarProps } from "../../hooks/libs/cardAvatarProps";
import { grey } from "@mui/material/colors";

type Props = {
    thread: odaiData;
};

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
    const statusCode = (error as AxiosError)?.response?.status;
    const isPaused = (error as AxiosError)?.message === "Network Error";
    const isFrontError = (errors?.body?.message as string)?.indexOf("30") === 0;

    const handlePostAnswer: SubmitHandler<FieldValues> = (formData) => {
        const thread_id = thread.id;
        const postData = { formData, thread_id };
        mutate(postData, {
            onSuccess: () => {
                resetForm();
            },
        });
    };

    return (
        <Box
            pt={isFrontError || statusCode || isPaused ? "4px" : "14px"}
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
                <Avatar {...cardAvatarProps(user?.name as string)} />
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
                    error={isFrontError}
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
                            maxLength: 100,
                        }}
                        {...register("body")}
                    />
                    <FormHelperText
                        id="post-thread-error-text"
                        sx={{ color: "error.main" }}
                    >
                        {isFrontError || statusCode || isPaused ? null : "　"}
                        {isFrontError && (errors.body?.message as ReactNode)}
                        {statusCode &&
                            `エラーにより投稿できませんでした。(${statusCode})`}
                        {isPaused &&
                            "インターネットに接続されておらず、投稿できません。"}
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
    );
};
export default ThreadPostAnswer;
