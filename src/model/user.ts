import { Post } from "./post";

export interface User {
    id?: string,
    avatar: string,
    bio: string,
    firstname: string,
    followers: Array<User>,
    following: Array<User>,
    link: string,
    posts: Array<Post>,
    savedPosts: Array<Post>,
    surname: string,
    title: string,
    username: string,
    creation: string,
    uid: string
}
