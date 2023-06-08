import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";

import { IonContent, IonFooter, IonIcon, IonInput, IonItem, IonList, IonThumbnail, IonToolbar } from "@ionic/react";
import { paperPlane } from "ionicons/icons";

import { Comment } from "../model/comment";
import { useAuth } from "../auth/AuthProvider";
import firebase from "../firebase/firebase";

import './Comments.css'
import { Post } from "../model/post";

const Comments = (props: { postId: string }) => {

    const { postId } = props;
    const { user } = useAuth();
    const history = useHistory();
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState<Post>();
    const refComment = useRef<HTMLIonInputElement>();

    const getComments = async (idPost: string) => {
        const response = await firebase.getCommentsFromIdPost(idPost);
        if (!response.error)
            setComments(response.data);
    }

    const getPost = async (idPost: string) => {
        const response = await firebase.getPost(idPost);
        if (!response.error)
            setPost(response.data);
    }

    useEffect(() => {
        getPost(postId);
        getComments(postId);
    }, [postId, history]);

    const addComment = async (postId: string, userId: string, username: string, avatar: string) => {
        const comment = refComment.current?.value as string;
        await firebase.addComment(postId, userId, username, avatar, comment);
    }

    return (
        <IonContent fullscreen class="comment-content">
            <IonList>
                <IonItem key={postId} className="ion-item first-ion-item">
                    <IonThumbnail className="thumbnail-comment" slot="start" onClick={() => { history.push("/profile/" + post?.user_id) }}>
                        <img className="image" alt="Foto de perfil" src={post?.user_avatar} />
                    </IonThumbnail>
                    <div className="containerComment">
                        <strong onClick={() => { history.push("/profile/" + post?.user_id) }}>{post?.user_username}</strong>
                        <p>{post?.caption}</p>
                    </div>
                </IonItem>
                {comments.map((comment: Comment) => {
                    return (
                        <IonItem key={comment.id} className="ion-item">
                            <IonThumbnail className="thumbnail-comment" slot="start" onClick={() => { history.push("/profile/" + comment.user_id) }}>
                                <img className="image" alt="Foto de perfil" src={comment.user_avatar} />
                            </IonThumbnail>
                            <div className="containerComment">
                                <strong onClick={() => { history.push("/profile/" + comment.user_id) }}>{comment.user_username}</strong> 
                                <p>{comment.comment}</p>
                            </div>
                        </IonItem>
                    );
                })}
            </IonList>

            <IonFooter>
                <IonItem className="toolbar-down ion-item" color={"light"}>
                    <IonThumbnail slot="start">
                        <img className="image" alt="Foto de perfil" src={user?.avatar} />
                    </IonThumbnail>
                    <IonInput
                        className="inputComment"
                        placeholder="Añade un comentario..."
                        ref={refComment as any}
                        type="text"
                    />
                    <IonIcon slot="end" icon={paperPlane} onClick={() => addComment(postId, user!.id!, user!.username, user!.avatar)} />
                </IonItem>
            </IonFooter>
        </IonContent>

    );
}

export default Comments;