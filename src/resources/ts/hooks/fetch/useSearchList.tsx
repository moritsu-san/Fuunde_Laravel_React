import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const searchList = async (keyword: string, isAnswer: boolean) => {
    const trimedKeyword = keyword.trim();
    if (!trimedKeyword) {
        throw new Error("検索するキーワードが無効です。");
    }
    if (!isAnswer) {
        const { data } = await axios.post("/api/searchThread", {
            trimedKeyword,
        });
        return data;
    } else {
        const { data } = await axios.post("/api/searchAnswer", {
            trimedKeyword,
        });
        return data;
    }
};

const useSearchList = (keyword: string, isAnswer: boolean) => {
    const queryName = isAnswer ? "search_answers" : "search_odais";
    return useQuery([queryName, keyword], () => searchList(keyword, isAnswer), {
        retry: 1,
    });
};

export default useSearchList;
