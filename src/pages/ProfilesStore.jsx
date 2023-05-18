import { Store } from "pullstate";
import firebase from "../firebase/firebase";

const profiles = await firebase.getUsers();

export const ProfilesStore = new Store({
    
    profiles: profiles
});

export const addProfilePost = (newPost) => {

    ProfilesStore.update(s => { s.posts = [ ...s.posts, newPost ]; });
}