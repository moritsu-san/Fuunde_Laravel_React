import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const like = async (id: number) => {
    const { data } = await axios.put(`/api/${id}/like`);
    return data;
};

const useLike = () => {
    return useMutation(like);
};

export default useLike;
