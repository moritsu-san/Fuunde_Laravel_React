export type userData = {
    id: number;
    name: string;
    username: string;
};

export type odaiData = {
    id: number;
    user_id: number;
    body: string;
    likes_count: number;
    created_at: Date;
    diff_for_humans: string;
    updated_at: Date;
    user: userData;
    likes: userData[];
};
