import { FC } from "react";
import { AccountInfo } from "../../models/User";
import { Box, List, ListItem } from "@mui/material";
import { AxiosError } from "axios";
import useFetchUserOdaiListByTime from "../../hooks/fetch/useFetchUserOdaiListByTime";
import OdaiCardSkeleton from "../../components/molecules/skeleton/OdaiCardSkeleton";
import OdaiCard from "../../components/molecules/OdaiCard";

type Props = {
    user: AccountInfo;
};

const AccountOdaiContent: FC<Props> = ({ user }) => {
    const { data, isLoading, error } = useFetchUserOdaiListByTime(user.id);
    const statusCode = (error as AxiosError)?.response?.status;
    return statusCode ? (
        <Box>読み込めませんでした。({statusCode})</Box>
    ) : (
        <List
            sx={{
                width: "100%",
            }}
        >
            {isLoading && <OdaiCardSkeleton cardNum={10} />}

            {data?.map((data) => {
                return (
                    <ListItem key={data.id} sx={{ width: 1, p: 0 }}>
                        <OdaiCard data={data} />
                    </ListItem>
                );
            })}
        </List>
    );
};

export default AccountOdaiContent;
