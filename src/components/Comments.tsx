import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonList, IonPage, IonThumbnail, IonToolbar } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

import { Comment } from "../model/comment";

import './Comments.css'
import firebase from "../firebase/firebase";

const Comments = (props: { postId: string }) => {

    const { postId } = props;
    const history = useHistory();
    const [comments, setComments] = useState([]);

    const getComments = async (idPost: string) => {
        const response = await firebase.getCommentsFromIdPost(idPost);
        if (!response.error)
            setComments(response.data);
    }

    useEffect(() => {
        getComments(postId);
    }, [postId, history]);

    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton icon={arrowBackOutline} color="dark" />
                    <p className='toolbar'>
                        Comentarios
                    </p>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonList>
                {comments.map((comment: Comment) => {
                    return (
                        <IonItem key={comment.id}>
                            <IonThumbnail slot="start" onClick={() => { history.push("/profile/" + comment.user_id) }}>
                                <img className="image" alt="Foto de perfil" src={comment.user_avatar} />
                            </IonThumbnail>
                            <div>
                                <strong onClick={() => { history.push("/profile/" + comment.user_id) }}>{comment.user_username}</strong>
                                <p>{comment.comment}</p>
                            </div>
                        </IonItem>
                    );
                })}
            </IonList>

            

        </IonContent>
    </IonPage >
}

export default Comments;