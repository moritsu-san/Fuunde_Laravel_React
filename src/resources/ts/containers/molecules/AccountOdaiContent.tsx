import { FC } from "react";
import { AccountInfo } from "../../models/User";
import { List, ListItem } from "@mui/material";
import useFetchUserOdaiListByTime from "../../hooks/fetch/useFetchUserOdaiListByTime";
import OdaiCardSkeleton from "../../components/molecules/skeleton/OdaiCardSkeleton";
import OdaiCard from "../../components/molecules/OdaiCard";
import PostNotFound from "../../components/atoms/PostNotFound";
import NotConnectionQuery from "../../components/atoms/NotConnectionQuery";
import RetryQuery from "../../components/atoms/RetryQuery";

type Props = {
    user: AccountInfo;
};

const AccountOdaiContent: FC<Props> = ({ user }) => {
    const { data, isFetching, isPaused, refetch } = useFetchUserOdaiListByTime(
        user.id
    );

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
    }

    if (data && typeof data !== "string" && data?.length !== 0) {
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
    } else if (data?.length === 0) {
        return <PostNotFound />;
    } else if (isPaused) {
        return <NotConnectionQuery refetch={refetch} />;
    } else {
        return <RetryQuery refetch={refetch} />;
    }
};

export default AccountOdaiContent;
