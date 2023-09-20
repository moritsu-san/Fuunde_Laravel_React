import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Box, CircularProgress } from "@mui/material";
import AccountMainHeader from "../../components/molecules/AccountMainHeader";
import AccountContent from "../organisms/AccountContent";
import { useEffect, useState } from "react";
import { AccountInfo } from "../../models/User";

const EnhancedAccount = () => {
    const { username } = useParams<{ username: string }>();
    const [data, setData] = useState<AccountInfo>();
    const [error, setError] = useState();
    const statusCode = (error as unknown as AxiosError)?.response?.status;
    const [isFetching, setIsFetching] = useState(false);

    const fetchAccountInfo = async () => {
        setIsFetching(true);
        await axios
            .get<AccountInfo>(`/api/getAccountInfo/${username}`)
            .then((res) => {
                setData(res.data);
                setIsFetching(false);
            })
            .catch((error) => {
                setError(error);
                setIsFetching(false);
            });
    };

    useEffect(() => {
        fetchAccountInfo();
    }, [username]);

    return isFetching ? (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            py="20px"
        >
            <CircularProgress size={30} />
        </Box>
    ) : (
        <Box display="flex" flexDirection="column">
            <AccountMainHeader name={data?.name} />
            <AccountContent data={data} statusCode={statusCode} />
        </Box>
    );
};

export default EnhancedAccount;
