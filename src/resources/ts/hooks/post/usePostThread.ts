import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FieldValues } from "react-hook-form";

const postThread = async (formData: FieldValues) => {
    const { data } = await axios.post("/api/postThread", formData);
    return data;
};

const usePostThread = () => {
    const queryClient = useQueryClient();
    return useMutation(postThread, {
        onSuccess: () => {
            queryClient.setQueryData(["openSnackbar"], "お題を投稿しました!");
        },
        networkMode: "offlineFirst",
    });
};

export default usePostThread;
