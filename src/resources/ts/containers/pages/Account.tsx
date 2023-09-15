import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { Box, CircularProgress } from "@mui/material";
import AccountMainHeader from "../../components/molecules/AccountMainHeader";
import useFetchAccountInfo from "../../hooks/fetch/useFetchAcoountInfo";
import AccountContent from "../organisms/AccountContent";

const EnhancedAccount = () => {
    const { username } = useParams<{ username: string }>();
    console.log(username);
    const { data, isFetching, error } = useFetchAccountInfo(username);
    const statusCode = (error as AxiosError)?.response?.status;

    return isFetching ? (
        <CircularProgress />
    ) : (
        <Box display="flex" flexDirection="column">
            <AccountMainHeader name={data?.name} />
            <AccountContent data={data} statusCode={statusCode} />
        </Box>
    );
};

export default EnhancedAccount;
