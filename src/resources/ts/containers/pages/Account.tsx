import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { User } from "../../models/User";

const EnhancedAccount = () => {
    const { userName } = useParams<{ userName: string }>();
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`/api/getUser/${userName}`)
            .then((res) => {
                setUser(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.response.status);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <CircularProgress />;
    } else if (error === 404) {
        return <h1>アカウントが存在しません</h1>;
    } else if (user) {
        return <h1>{user?.username}</h1>;
    } else {
        return <h1>ReTry</h1>;
    }
};

export default EnhancedAccount;
