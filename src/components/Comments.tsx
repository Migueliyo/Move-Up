import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";

import { IonContent, IonFooter, IonIcon, IonInput, IonItem, IonList, IonThumbnail } from "@ionic/react";
import { paperPlane } from "ionicons/icons";

import { Comment } from "../model/comment";
import { useAuth } from "../auth/AuthProvider";
import { Post } from "../model/post";

import firebase from "../firebase/firebase";
import TimeDifferenceComment from "./TimeDifferenceComment";

import './Comments.css'

const Comments = (props: { postId: string }) => {

    const { postId } = props;
    const { user } = useAuth();
    const history = useHistory();
    const [comments, setComments] = useState<Comment[]>([]);
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
    }, [comments]);

    const addComment = async (postId: string, userId: string, username: string, avatar: string) => {
        const comment = refComment.current?.value as string;
        refComment.current!.value = '';
        const response = await firebase.addComment(postId, userId, username, avatar, comment);
        if (!response.error) {
            setComments(prevComments => [response.data, ...prevComments]);
        }
    }

    const sortedComments = comments.sort((a: any, b: any) => b.time - a.time);

    return (
        <IonContent class="comment-content">
            <IonList>
                <IonItem key={postId} className="ion-item first-ion-item">
                    <IonThumbnail className="thumbnail-comment" slot="start" onClick={() => { history.push("/profile/" + post?.user_id) }}>
                        <div>
                            <img className="image" alt="Foto de perfil" src={post?.user_avatar} />
                        </div>
                    </IonThumbnail>
                    <div className="containerComment">
                        <strong onClick={() => { history.push("/profile/" + post?.user_id) }}>{post?.user_username}</strong>
                        
                        <p>{post?.caption}</p>
                    </div>
                </IonItem>
                
                {sortedComments.map((comment: Comment, index: number) => {
                    return (
                        <IonItem key={index} className="ion-item">
                            <IonThumbnail className="thumbnail-comment" slot="start" onClick={() => { history.push("/profile/" + comment.user_id) }}>
                                <img className="image" alt="Foto de perfil" src={comment.user_avatar} />
                            </IonThumbnail>
                            <div className="containerComment">
                                <strong onClick={() => { history.push("/profile/" + comment.user_id) }}>{comment.user_username} </strong>
                                <span className="time"><TimeDifferenceComment timestamp={comment.time}/></span> 
                                <p>{comment.comment}</p>
                            </div>
                        </IonItem>
                    );
                })}
            </IonList>

            <IonFooter class="ion-item-down">
                <IonItem className="toolbar-down ion-item-down" color={"light"}>
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