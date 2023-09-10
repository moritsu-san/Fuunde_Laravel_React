export type answerData = {
    id: number;
    body: string;
    thread_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    likes_count: number;
    diff_for_humans: string;
    user: userData;
    likes: userData[];
};

type userData = {
    id: number;
    name: string;
    username: string;
};

export type Data = {
    id: number;
    user_id: number;
    body: string;
    created_at: string;
    updated_at: string;
    likes_count: number;
    diff_for_humans: string;
    answers: answerData[];
    user: userData;
    likes: userData[];
};