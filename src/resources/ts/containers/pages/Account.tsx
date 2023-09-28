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

    const fetchAccountInfo = async () => {
        await axios
            .get<AccountInfo>(`/api/getAccountInfo/${username}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                setError(error);
            });
    };

    useEffect(() => {
        fetchAccountInfo();
    }, [username]);

    if (data === undefined && !error) {
        return (
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                py="20px"
            >
                <CircularProgress size={30} />
            </Box>
        );
    }

    return (
        <Box display="flex" flexDirection="column">
            <AccountMainHeader name={data?.name} />
            <AccountContent data={data} error={error} />
        </Box>
    );
};

export default EnhancedAccount;
