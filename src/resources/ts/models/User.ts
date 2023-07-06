export type User = {
    name: string;
    nick_name: string;
    auth_type: "SOCIAL" | "MAIL" | "BOTH";
    email: string;
};
