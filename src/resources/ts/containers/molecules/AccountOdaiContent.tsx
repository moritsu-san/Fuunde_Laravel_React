import { FC } from "react";
import { AccountInfo } from "../../models/User";
import { ListItem } from "@mui/material";
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
            <ul>
                <OdaiCardSkeleton cardNum={10} />
            </ul>
        );
    }

    if (data && typeof data !== "string" && data?.length !== 0) {
        return (
            <ul>
                {data?.map((data) => {
                    return (
                        <ListItem key={data.id} sx={{ width: 1, p: 0 }}>
                            <OdaiCard data={data} />
                        </ListItem>
                    );
                })}
            </ul>
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
