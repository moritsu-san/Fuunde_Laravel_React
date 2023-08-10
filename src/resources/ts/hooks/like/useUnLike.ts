import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const unLike = async (id: number) => {
    const { data } = await axios.delete(`/api/${id}/like`);
    return data;
};

const useUnLike = () => {
    return useMutation(unLike);
};

export default useUnLike;
