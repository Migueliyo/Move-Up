import { Comment } from "./coment";

export interface Post {
    id: string,
    image: string,
    caption: string,
    likes: number,
    liked: boolean,
    user_id: string,
    time: Date,
    comments: Array<Comment>
}