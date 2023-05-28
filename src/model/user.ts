import { Post } from "./post";

export interface User {
    id?: string,
    avatar: string,
    bio: string,
    firstname: string,
    followers: number,
    following: number,
    link: string,
    posts: Array<Post>,
    surname: string,
    title: string,
    username: string,
    uid: string
}
