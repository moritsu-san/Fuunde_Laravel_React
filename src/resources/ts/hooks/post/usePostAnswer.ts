import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FieldValues } from "react-hook-form";

const postAnswer = async (postData: FieldValues) => {
    const formData = postData.formData;
    const thread_id = postData.thread_id;
    const { data } = await axios.post(`/api/postAnswer/${thread_id}`, formData);
    return data;
};

const usePostAnswer = () => {
    return useMutation(postAnswer);
};

export default usePostAnswer;
