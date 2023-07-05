export type User = {
    name: string;
    email: string;
    auth_type: 'SOCIAL' | 'MAIL' | 'BOTH';   
}