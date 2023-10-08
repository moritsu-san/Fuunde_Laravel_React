import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHistory } from "react-router-dom";
import { FC, useState } from "react";
import { grey } from "@mui/material/colors";

const schema = z.object({
    keyword: z
        .string()
        .refine((val) => val.trim().length, "入力してください。")
        .refine(
            (val) => val.length <= 30,
            (val) => ({
                message: `30文字以下にしてください。(${val.length}文字) `,
            })
        ),
});

type Props = {
    defKeyword?: string;
    isAnswer?: boolean;
};

const SearchBox: FC<Props> = ({ defKeyword, isAnswer }) => {
    const history = useHistory();
    const [isFocused, setIsFocused] = useState(false);
    const handleClick: SubmitHandler<FieldValues> = ({ keyword }) => {
        if (isAnswer) {
            history.push(`/search/thread?keyword=${keyword}&mode=answer`);
        } else {
            history.push(`/search/thread?keyword=${keyword}`);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { isValid },
        watch,
        setValue,
    } = useForm({
        defaultValues: { keyword: defKeyword && `${defKeyword}` },
        mode: "onChange",
        resolver: zodResolver(schema),
        shouldUnregister: false,
    });
    const watchKeyword = watch("keyword");

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(handleClick)}
            onFocus={() => {
                setIsFocused(true);
            }}
            onBlur={() => {
                setTimeout(() => {
                    setIsFocused(false);
                }, 200);
            }}
            noValidate
            p="2px 4px"
            display="flex"
            alignItems="center"
            width={400}
            height={40}
            border={1}
            borderColor={isFocused ? "primary.main" : grey[300]}
            borderRadius={2}
            bgcolor={isFocused ? "white" : grey[300]}
        >
            <IconButton
                type="submit"
                disabled={!isValid}
                color={isValid ? "primary" : "default"}
                disableRipple
                sx={{ p: "10px" }}
                aria-label="search"
            >
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="キーワードを検索"
                inputProps={{ "aria-label": "search google maps" }}
                {...register("keyword")}
            ></InputBase>
            {watchKeyword && isFocused && (
                <IconButton
                    type="button"
                    onClick={() => {
                        setIsFocused(true);
                        setValue("keyword", "");
                    }}
                    disableRipple
                    sx={{ p: "10px" }}
                    aria-label="delete"
                >
                    <HighlightOffIcon />
                </IconButton>
            )}
        </Box>
    );
};

export default SearchBox;
