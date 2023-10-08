import { Box } from "@mui/material";
import ExploreMainHeader from "../../components/molecules/ExploreMainHeader";
import useFetchOdaiListByLike from "../../hooks/fetch/useFetchOdaiListByLike";
import ExploreContent from "../../components/molecules/ExploreContent";

const Explore = () => {
    const { data, isFetching, isPaused, refetch } = useFetchOdaiListByLike();
    return (
        <Box display="flex" flexDirection="column">
            <ExploreMainHeader />
            <ExploreContent
                isFetching={isFetching}
                data={data}
                isPaused={isPaused}
                refetch={refetch}
            />
        </Box>
    );
};

export default Explore;
