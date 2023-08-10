type DataUser = {
    id: number;
    name: string;
    username: string;
};

export type DataAnswers = {
    id: number;
    body: string;
    thread_id: number;
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
    body: string;
    likes_count: number;
    is_liked: boolean;
    created_at: string;
    diff_for_humans: string;
    updated_at: string;
    user: DataUser;
    answers: Array<DataAnswers>;
};
