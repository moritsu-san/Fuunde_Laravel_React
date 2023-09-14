import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { Box } from "@mui/material";
import AccountMainHeader from "../../components/molecules/AccountMainHeader";
import useFetchAccountInfo from "../../hooks/fetch/useFetchAcoountInfo";
import AccountContent from "../organisms/AccountContent";

const EnhancedAccount = () => {
    const { username } = useParams<{ username: string }>();
    const { data, isLoading, error, refetch } = useFetchAccountInfo(username);
    const statusCode = (error as AxiosError)?.response?.status;

    return (
        <Box display="flex" flexDirection="column">
            <AccountMainHeader name={data?.name} />
            <AccountContent data={data} isLoading={isLoading} statusCode={statusCode} />
        </Box>
    );
};

export default EnhancedAccount;
