type userData = {
    id: number;
    name: string;
    username: string;
};

export type Data = {
    id: number;
    user_id: number;
    body: string;
    likes_count: number;
    created_at: string;
    diff_for_humans: string;
    updated_at: string;
    user: userData;
    likes: userData[];
};
