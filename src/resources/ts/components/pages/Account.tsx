import { FC } from "react";

type Props = {
    userName: string;
};

const Account: FC<Props> = ({ userName }) => {
    return <div>{userName}</div>;
};

export default Account;
