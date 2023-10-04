import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const searchOdaiList = async (keyword: string) => {
    const { data } = await axios.post("/api/searchThread", { keyword });
    return data;
};

const useSearchOdaiList = (keyword: string) => {
    return useQuery(["search_odais", keyword], () => searchOdaiList(keyword));
};

export default useSearchOdaiList;
