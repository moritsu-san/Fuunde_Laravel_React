import { Box, List } from "@mui/material";
import queryString from "query-string";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import useSearchOdaiList from "../../hooks/fetch/useSearchOdaiList";
import SearchMainHeader from "../../components/molecules/SearchMainHeader";
import SearchContent from "../../components/molecules/SearchContent";

const SearchThread = () => {
    const location = useLocation();
    const search = useMemo(
        () => queryString.parse(location.search),
        [location.search]
    );
    const keyword = search["keyword"];
    const { data, isFetching, isPaused, refetch } = useSearchOdaiList(
        keyword as string
    );
    return (
        <Box display="flex" flexDirection="column">
            <SearchMainHeader keyword={keyword as string} />
            <List
                sx={{
                    width: "100%",
                }}
            >
                <SearchContent
                    isFetching={isFetching}
                    data={data}
                    isPaused={isPaused}
                    refetch={refetch}
                />
            </List>
        </Box>
    );
};

export default SearchThread;
