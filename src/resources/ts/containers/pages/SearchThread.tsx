import { Box } from "@mui/material";
import queryString from "query-string";
import { useMemo } from "react";
import { Redirect, useLocation } from "react-router-dom";
import SearchMainHeader from "../../components/molecules/SearchMainHeader";
import SearchThreadContent from "../../components/molecules/SearchOdaiContent";
import useSearchList from "../../hooks/fetch/useSearchList";
import SearchAnswerContent from "../../components/molecules/SearchAnswerContent";

const SearchThread = () => {
    const location = useLocation();
    const search = useMemo(
        () => queryString.parse(location.search),
        [location.search]
    );
    console.log(search);
    const keyword = Array.isArray(search.keyword)
        ? search.keyword[0]
        : search.keyword;
    const mode = Array.isArray(search.mode) ? search.mode[0] : search.mode;
    const isAnswer = mode === "answer";
    if (!keyword) {
        return <Redirect to="/explore" />;
    }
    const { data, isFetching, isPaused, refetch } = useSearchList(
        keyword as string,
        isAnswer
    );
    return (
        <Box display="flex" flexDirection="column">
            <SearchMainHeader keyword={keyword as string} isAnswer={isAnswer} />
            <Box>
                {!isAnswer ? (
                    <SearchThreadContent
                        isFetching={isFetching}
                        data={data}
                        isPaused={isPaused}
                        refetch={refetch}
                    />
                ) : (
                    <SearchAnswerContent
                        isFetching={isFetching}
                        data={data}
                        isPaused={isPaused}
                        refetch={refetch}
                    />
                )}
            </Box>
        </Box>
    );
};

export default SearchThread;
