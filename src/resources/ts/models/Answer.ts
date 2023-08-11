type DataUser = {
    id: number;
    name: string;
    username: string;
};

type LikesUser = {
    id: number;
    name: string;
    username: string;
    email: string;
    auth_type: "SOCIAL" | "MAIL" | "BOTH";
}

export type DataThread = {
    id: number;
    body: string;
    user_id: number;
    created_at: string;
    diff_for_humans: string;
    updated_at: string;
    likes_count: number;
    user: {
        id: number;
        name: string;
        username: string;
    };
};

export type Data = {
    id: number;
    user_id: number;
    thread_id:number;
    body: string;
    likes_count: number;
    created_at: string;
    diff_for_humans: string;
    updated_at: string;
    user: DataUser;
    thread: DataThread;
    likes: LikesUser[];
};