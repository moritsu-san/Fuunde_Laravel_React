import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Data = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
};

const fetchThreadList = async () => {
    const { data } = await axios.get<Data[]>(
        "https://jsonplaceholder.typicode.com/users"
    );
    return data;
};

const useFetchThreadList = () => {
    return useQuery<Data[]>(["threads"], fetchThreadList);
};

export default useFetchThreadList;
