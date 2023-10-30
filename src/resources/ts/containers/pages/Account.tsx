import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { Box } from "@mui/material";
import AccountMainHeader from "../../components/molecules/AccountMainHeader";
import AccountContent from "../organisms/AccountContent";
import useFetchAccountInfo from "../../hooks/fetch/useFetchAccountInfo";

const EnhancedAccount = () => {
    const { username } = useParams<{ username: string }>();
    const { data, isFetching, isPaused, error, refetch } =
        useFetchAccountInfo(username);
    const statuscode = (error as unknown as AxiosError)?.response?.status;

    return (
        <Box>
            <AccountMainHeader name={data?.name} />
            <AccountContent
                isFetching={isFetching}
                data={data}
                isPaused={isPaused}
                refetch={refetch}
                statuscode={statuscode}
            />
        </Box>
    );
};

export default EnhancedAccount;
