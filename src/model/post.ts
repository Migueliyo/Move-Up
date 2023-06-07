import { Comment } from "./comment";

export interface Post {
    id?: string,
    image: string,
    caption: string,
    likes: Array<any>,
    user_id: string,
    user_username: string,
    user_avatar: string,
    time: Date,
    comments: Array<Comment>
}