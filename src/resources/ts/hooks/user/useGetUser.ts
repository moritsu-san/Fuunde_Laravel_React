import { useMutation } from "@tanstack/react-query";
import { User } from "../../models/User";
import axios from "axios";

const getUser = async (userName: string) => {
    const { data } = await axios.get(`/api/getUser/${userName}`);
    return data;
};

const useGetUser = () => {
    return useMutation(getUser);
};

export default useGetUser;
