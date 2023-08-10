import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FieldValues } from "react-hook-form";

const postThread = async (formData: FieldValues) => {
    const { data } = await axios.post("/api/postThread", formData);
    return data;
};

const usePostThread = () => {
    return useMutation(postThread);
};

export default usePostThread;
