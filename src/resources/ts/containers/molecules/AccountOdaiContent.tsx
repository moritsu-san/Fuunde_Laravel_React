import { FC } from "react";
import { AccountInfo } from "../../models/User";
import { List, ListItem } from "@mui/material";
import { AxiosError } from "axios";
import useFetchUserOdaiListByTime from "../../hooks/fetch/useFetchUserOdaiListByTime";
import OdaiCardSkeleton from "../../components/molecules/skeleton/OdaiCardSkeleton";
import OdaiCard from "../../components/molecules/OdaiCard";
import Retry from "../../components/atoms/Retry";
import PostNotFound from "../../components/atoms/PostNotFound";

type Props = {
    user: AccountInfo;
};

const AccountOdaiContent: FC<Props> = ({ user }) => {
    const { data, isFetching, error } = useFetchUserOdaiListByTime(user.id);
    const statusCode = (error as AxiosError)?.response?.status;
    if (isFetching) {
        return (
            <List
                sx={{
                    width: "100%",
                }}
            >
                <OdaiCardSkeleton cardNum={10} />
            </List>
        );
    } else if (statusCode || typeof data === "string") {
        return <Retry />;
    } else if (data?.length) {
        return (
            <List
                sx={{
                    width: "100%",
                }}
            >
                {data?.map((data) => {
                    return (
                        <ListItem key={data.id} sx={{ width: 1, p: 0 }}>
                            <OdaiCard data={data} />
                        </ListItem>
                    );
                })}
            </List>
        );
    } else {
        return <PostNotFound />;
    }
};

export default AccountOdaiContent;
