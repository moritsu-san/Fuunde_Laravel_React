type userData = {
    id: number;
    name: string;
    username: string;
};

type threadData = {
    id: number;
    body: string;
    user_id: number;
    created_at: string;
    diff_for_humans: string;
    updated_at: string;
    likes_count: number;
    user: userData;
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
    user: userData;
    thread: threadData;
    likes: userData[];
};