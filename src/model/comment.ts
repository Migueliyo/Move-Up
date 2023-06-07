export interface Comment {
    id?: string,
    user_id: string,
    user_username: string,
    user_avatar: string,
    time: Date,
    comment: string
}