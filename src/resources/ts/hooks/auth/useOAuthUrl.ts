import { useMutation } from "@tanstack/react-query";
import { Provider } from "../../models/OAuth";
import axios from "axios";

const getOAuthUrl = async (provider: Provider) => {
    const { data } = await axios.get(`/api/login/${provider}`);
    return data;
};

const useOAuthUrl = () => {
    return useMutation(getOAuthUrl, {
        onSuccess: (data) => {
            window.location.href = data.redirect_url;
        },
    });
};

export default useOAuthUrl;
