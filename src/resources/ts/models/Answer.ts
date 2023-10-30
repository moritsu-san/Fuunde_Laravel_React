type userData = {
    id: number;
    name: string;
    username: string;
};

export type threadData = {
    id: number;
    body: string;
    user_id: number;
    created_at: Date;
    diff_for_humans: string;
    updated_at: Date;
    likes_count: number;
    user: userData;
};

export type answerData = {
    id: number;
    user_id: number;
    thread_id: number;
    body: string;
    likes_count: number;
    created_at: Date;
    diff_for_humans: string;
    updated_at: Date;
    user: userData;
    thread: threadData;
    likes: userData[];
};
