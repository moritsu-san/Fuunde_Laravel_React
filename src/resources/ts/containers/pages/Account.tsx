import { useParams } from "react-router-dom";
import Account from "../../components/pages/Account";

const EnhancedAccount = () => {
    const { userName } = useParams<{ userName: string }>();
    return <Account userName={userName} />;
};

export default EnhancedAccount;
