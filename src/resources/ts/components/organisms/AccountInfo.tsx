import { FC } from "react";
import { AccountInfo } from "../../models/User";

type Props = {
    user?: AccountInfo;
};

const AccountInfo:FC<Props> = ({ user }) => {
    return <h1>{user?.username}</h1>;
};

export default AccountInfo;
