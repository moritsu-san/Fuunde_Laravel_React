export type User = {
    id: number;
    username: string;
    name: string;
    auth_type: "SOCIAL" | "MAIL" | "BOTH";
    email: string;
};

export type AccountInfo = {
    id: number;
    username: string;
    name: string;
    created_at: Date;
    answer_liked_counts: number;
    odai_counts: number;
    answer_counts: number;
};
