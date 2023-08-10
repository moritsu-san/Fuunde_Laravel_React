export type User = {
    username: string;
    name: string;
    auth_type: "SOCIAL" | "MAIL" | "BOTH";
    email: string;
};
